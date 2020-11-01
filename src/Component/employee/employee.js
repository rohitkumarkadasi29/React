import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik, FormikProps } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import { employeeForm, deleteEmployee, editEmployee } from '../../action/employeeActions';

import "./employee.css";

const employeeValidationSchema = Yup.lazy((values) => {
    return Yup.object().shape({
        empFirstName: Yup.string().required("Requried field"),
        empLastName: Yup.string().required("Requried field"),
        empId: Yup.string().required("Requried field"),
        empDesignation: Yup.string().required("Requried field"),
        empDob: Yup.string().required("Requried field"),
    })
})


const Employee = () => {
    let initialValues = {
        empId: "",
        empFirstName: "",
        empLastName: "",
        empDesignation: "",
        empGender: "",
        empDob: ""
    }

    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectEmployeeId, setSelectEmployeeId] = useState("");
    const [selectEmployeeDetails, setSelectEmployeeDetails] = useState({});
    const [selectEmployeeInfo, setSelectEmployeeInfo] = useState({});

    if (selectEmployeeInfo) {
        initialValues = {
            empId: selectEmployeeInfo.empId,
            empFirstName: selectEmployeeInfo.empFirstName,
            empLastName: selectEmployeeInfo.empLastName,
            empDesignation: selectEmployeeInfo.empDesignation,
            empGender: selectEmployeeInfo.empGender,
            empDob: selectEmployeeInfo.empDob
        }
    }

    const employeeList = useSelector((state) => state.employee.employeeList)
    console.log("employee===>", employeeList)
    const dispatch = useDispatch()

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const onClickEmployeeForm = () => {
        setModalType("employee-form")
        handleShow()
    }


    const onCreateEmployeeForm = (data) => {
        dispatch(employeeForm(data))
        handleClose()
    }

    const onUpdateEmployeeForm = (data) => {
        dispatch(editEmployee(data))
        handleClose()
        setSelectEmployeeInfo({})
    }

    const onClickDelete = (item, index) => {
        console.log("delete==>", item)
        setSelectEmployeeDetails(item)
        setSelectEmployeeId(index)
        setModalType("delete")
        handleShow()
    }

    const deleteEmployeeItem = () => {
        dispatch(deleteEmployee(selectEmployeeId))
        handleClose()
    }

    const onViewHandler = (item, index) => {
        console.log("view==>", item, index)
        setModalType("view")
        setSelectEmployeeDetails(item)
        handleShow()
    }

    const onSubmitEmployeeHandler = (data) => {
        console.log("data", data);
        console.log("selectEmployeeInfo===>", selectEmployeeInfo);
        if (selectEmployeeInfo.empFirstName) {
            onUpdateEmployeeForm(data)
        } else {
            onCreateEmployeeForm(data)
        }
    }


    const onEditEmployee = (item) => {
        console.log("Edit Item==>", item)
        setSelectEmployeeInfo(item)
        handleShow()
        setModalType("employee-form")
    }

    return (
        <div className="employee-container">
            <div className="employee-form-btn">
                <Button variant="primary" onClick={onClickEmployeeForm}>+ Add Employee</Button>
            </div>

            <div className="mt-20">
                {employeeList.length > 0 ?
                    <>
                        <h1>  EMPLOYEE INFO</h1>
                        <table class="table mt-10">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Employee ID</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeList.length > 0 ?
                                    <>
                                        {
                                            employeeList?.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td scope="row">{index + 1}</td>
                                                        <td>{item.empFirstName}</td>
                                                        <td>{item.empLastName}</td>
                                                        <td>{item.empId}</td>
                                                        <td>{item.empGender}</td>
                                                        <td><i class="fa fa-pencil icon-wrapper" aria-hidden="true" onClick={() => onEditEmployee(item)}></i> | <i class="fa fa-trash-o icon-modifier" aria-hidden="true" onClick={() => onClickDelete(item, index)}></i> | <i class="fa fa-eye" aria-hidden="true" onClick={() => onViewHandler(item, index)}></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </> : <h2>data is not found</h2>
                                }

                            </tbody>
                        </table>
                    </>
                    : null}
            </div>

            <Modal show={show && modalType === "delete"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <p>Are you sure, you want to delete the record of {selectEmployeeDetails.empFirstName}{"  "}{selectEmployeeDetails.empLastName}?</p>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                                                </Button>
                        <Button type="submit" variant="primary btn-add" onClick={deleteEmployeeItem}>
                            Delete
                            </Button>
                    </>
                </Modal.Body>

            </Modal>

            <>
                <Modal show={show && modalType === "view"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <p className="view-header-wrapper">Details of <span className="view-header-value">{selectEmployeeDetails.empFirstName}{" "}{selectEmployeeDetails.empLastName}:</span></p>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div className="view-container">
                                <div>
                                    <p className="view-details-wrapper">Name: <span className="view-value">{selectEmployeeDetails.empFirstName}{" "}{selectEmployeeDetails.empLastName}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">Employee ID: <span className="view-value">{selectEmployeeDetails.empId}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">Employee Designation: <span className="view-value">{selectEmployeeDetails.empDesignation}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">DOB: <span className="view-value">{selectEmployeeDetails.empDob}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">Gender: <span className="view-value">{selectEmployeeDetails.empGender}</span></p>
                                </div>
                            </div>
                        </>
                    </Modal.Body>

                </Modal>
            </>

            <>
                <Modal show={show && modalType === "employee-form"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>EMPLOYEE FORM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmitEmployeeHandler}
                                validationSchema={employeeValidationSchema}
                                render={({
                                    errors,
                                    values,
                                }) => (
                                        <Form>

                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >First Name</label>
                                                    <Field type="text" class="form-control" name="empFirstName" placeholder="first name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.empFirstName}
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Last Name</label>

                                                    <Field type="text" class="form-control" name="empLastName" placeholder="last name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.empLastName}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Employee ID</label>
                                                    <Field type="text" class="form-control" name="empId" placeholder="Id" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.empId}
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Employee Designation</label>
                                                    <Field type="text" class="form-control" name="empDesignation" placeholder="designation" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.empDesignation}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >DOB</label>
                                                    <Field type="date" class="form-control" name="empDob" placeholder="DOB" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.empDob}
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Gender</label>
                                                    <div>
                                                        <Field name="empGender" as="select" class="form-control">
                                                            <option value="">Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="others">Others</option>
                                                        </Field>
                                                        <div style={{ color: "red" }}>
                                                            {errors.empDob}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button type="submit" variant="primary" >
                                                    {selectEmployeeInfo.empFirstName ? "Update" : "Add"}
                                                </Button>
                                            </>

                                        </Form>
                                    )}
                            />
                        </>
                    </Modal.Body>

                </Modal>
            </>
        </div>
    )
}

export default Employee;