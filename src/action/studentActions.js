import {
ADD_STUDENT_INFO, DELETE_STUDENT_INFO, EDIT_STUDENT_INFO
} from './types';

export const studentFrom  = (studentObj) => ({
    type:ADD_STUDENT_INFO,
    payload:studentObj
})
export const deleteStudent = (id) =>( {
    type: DELETE_STUDENT_INFO,
    payload: id
})

export const editStudentForm  = (updatedStudentObj) =>{
    console.log(updatedStudentObj, "updaredobject===>")
    return {
   type:EDIT_STUDENT_INFO,
   payload:updatedStudentObj
    }
}


