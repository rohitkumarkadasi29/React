import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik, FormikProps } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import { studentFrom, deleteStudent, editStudentForm } from "../../action/studentActions";
import "./students.css"


const studentValidationSchema = Yup.lazy((values) => {
    return Yup.object().shape({
        firstName: Yup.string().required("Required field!"),
        lastName: Yup.string().required("Required field!"),
        fatherFirstName: Yup.string().required("Required field!"),
        fatherLastName: Yup.string().required("Required field!")
    })
})

const Students = () => {

    let initialValues = {
        firstName: "",
        lastName: "",
        fatherFirstName: "",
        fatherLastName: "",
        gender: "",
        dob: ""
    }
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectId, setSelectId] = useState("")
    const [selectDetails, setSelecteDetails] = useState({})
    const [selectStudentInfo, setSelectStudentInfo] = useState({})

    if (selectStudentInfo) {
        initialValues = {
            firstName: selectStudentInfo.firstName,
            lastName: selectStudentInfo.lastName,
            fatherFirstName: selectStudentInfo.fatherFirstName,
            fatherLastName: selectStudentInfo.fatherLastName,
            gender: selectStudentInfo.gender,
            dob: selectStudentInfo.dob
        }
    }


    const studentList = useSelector((state) => state.student.studentList)

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true);
    }
    const onClickStudentForm = () => {
        console.log("studet-formm=========>")
        setModalType("student-form")
        handleShow()
    }

    const onCreateStudentForm = (data) => {
        dispatch(studentFrom(data))
        handleClose()
    }
    const onUpdateStudentForm = (data) => {
        dispatch(editStudentForm(data))
        handleClose()
        setSelectStudentInfo({})
    }
    const onSubmitStudentHandler = (data) => {
        console.log("data===>", data)
        console.log("selectedInfo===>", selectStudentInfo)
        if (selectStudentInfo.firstName) {
            onUpdateStudentForm(data)
        } else {
            onCreateStudentForm(data)
        }
    }


    const onClickDelete = (item, index) => {
        setSelecteDetails(item)
        setSelectId(index)
        setModalType("delete")
        handleShow()
    }
    const deleteItem = () => {

        dispatch(deleteStudent(selectId))
        handleClose();
    }
    const onEditStudent = (item) => {
        setSelectStudentInfo(item)
        setModalType("student-form")
        handleShow()
    }

    const onViewHandler = (item) => {
        setModalType("view")
        setSelecteDetails(item)
        handleShow()
    }
    return (
        <div className="student-container">
            <div className="student-form-btn">
                <Button variant="primary" onClick={onClickStudentForm}>+ Add Student</Button>{' '}
            </div>

            <>
                <Modal show={show && modalType === "delete"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <p>Are you sure, Do you want to delete the record of {selectDetails.firstName}{"  "}{selectDetails.lastName}?</p>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                                                </Button>
                            <Button type="submit" variant="primary btn-add" onClick={deleteItem}>
                                Delete
                            </Button>
                        </>
                    </Modal.Body>

                </Modal>
            </>

            <>
                <Modal show={show && modalType === "view"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <p className="view-header-wrapper">Details of <span className="view-header-value">{selectDetails.firstName}{" "}{selectDetails.lastName}:</span></p>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div className="view-container">
                                <div>
                                    <p className="view-details-wrapper">Name: <span className="view-value">{selectDetails.firstName}{" "}{selectDetails.lastName}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">Farther's Name: <span className="view-value">{selectDetails.fatherFirstName}{" "}{selectDetails.fatherLastName}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">DOB: <span className="view-value">{selectDetails.dob}</span></p>
                                </div>
                                <div>
                                    <p className="view-details-wrapper">Gender: <span className="view-value">{selectDetails.gender}</span></p>
                                </div>
                            </div>
                        </>
                    </Modal.Body>

                </Modal>
            </>


            <div className="mt-20">
                {studentList.length > 0 ?
                    <>
                        <h1> STUDENT INFO</h1>
                        <table className="table mt-10">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.length > 0 ?
                                    <>
                                        {
                                            studentList?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td scope="row">{index + 1}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.dob}</td>
                                                        <td>{item.gender}</td>
                                                        <td><i className="fa fa-pencil icon-wrapper" aria-hidden="true" onClick={() => onEditStudent(item)}></i> | <i className="fa fa-trash-o icon-modifier" aria-hidden="true" onClick={() => onClickDelete(item, index)}></i> | <i className="fa fa-eye" aria-hidden="true" onClick={() => onViewHandler(item, index)}></i></td>
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

            
            <div>
                <Modal show={show && modalType === "student-form"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> {selectStudentInfo.firstName ? "UPDATE  STUDENT FORM" : " STUDENT FORM"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmitStudentHandler}
                                validationSchema={studentValidationSchema}
                                render={({
                                    errors,
                                    values,
                                }) => (
                                        <Form>
                                            {console.log("values====>", values)}
                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >First Name</label>
                                                    <Field type="text" className="form-control" name="firstName" placeholder="first name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.firstName}
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Last Name</label>

                                                    <Field type="text" className="form-control" name="lastName" placeholder="last name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.lastName}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Father's First Name</label>
                                                    <Field type="text" className="form-control" name="fatherFirstName" placeholder="first name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.fatherFirstName}
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Father's Last Name</label>

                                                    <Field type="text" className="form-control" name="fatherLastName" placeholder="last name" />
                                                    <div style={{ color: "red" }}>
                                                        {errors.fatherLastName}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >DOB</label>
                                                    <Field type="date" className="form-control" name="dob" placeholder="DOB" />
                                                </div>
                                                <div className="form-group col-lg-6 col-md-6">
                                                    <label >Gender</label>
                                                    <div>
                                                        <Field name="gender" as="select" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="others">Others</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                            <>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button type="submit" variant="primary" >
                                                    {selectStudentInfo.firstName ? " Update " : "Add"}
                                                </Button>
                                            </>

                                        </Form>
                                    )}
                            />
                        </>
                    </Modal.Body>

                </Modal>
            </div>
        </div>
    )
}

export default Students;