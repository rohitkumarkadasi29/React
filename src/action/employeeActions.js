import {
    ADD_EMPLOYEE_INFO, DELETE_EMPLOYEE_INFO, EDIT_EMPLOYEE_INFO
} from './types';

export const employeeForm = (employeeObj) => ({
    type: ADD_EMPLOYEE_INFO,
    payload: employeeObj
})

export const deleteEmployee = (id) => ({
    type: DELETE_EMPLOYEE_INFO,
    payload: id
})

export const editEmployee = (updatedEmployeeObj) => { 
    return {
        type: EDIT_EMPLOYEE_INFO,
        payload: updatedEmployeeObj
    }
}