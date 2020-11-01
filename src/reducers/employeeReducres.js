import {
    ADD_EMPLOYEE_INFO, EDIT_EMPLOYEE_INFO, DELETE_EMPLOYEE_INFO
} from '../action/types';

const initialState = {
    employeeList: []
}

const employeeReducer = (state = initialState, action, index) => {
    switch (action.type) {
        case ADD_EMPLOYEE_INFO:
            return {
                ...state,
                employeeList: state.employeeList.concat(action.payload)
            }
        case DELETE_EMPLOYEE_INFO:
            return {
                ...state,
                employeeList: state.employeeList.filter((obj, index) => index !== action.payload)
            }
        case EDIT_EMPLOYEE_INFO:

            let updatedEmployeeList = state.employeeList.map(obj => {
                const {
                    empId ,
                    empFirstName ,
                    empLastName ,
                    empDesignation ,
                    empGender ,
                    empDob
                } = action.payload
                if(obj.empId === empId) {
                    obj.empFirstName = empFirstName;
                    obj.empLastName = empLastName;
                    obj.empId = empId;
                    obj.empGender = empGender;
                    obj.empDesignation = empDesignation;
                    obj.empDob = empDob;
                }
                return obj;
            })
            return {
                ...state ,
                employeeList: updatedEmployeeList
            }
            default :
            return state
    }
}

export default employeeReducer;