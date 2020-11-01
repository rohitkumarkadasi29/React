import { ADD_STUDENT_INFO, DELETE_STUDENT_INFO, EDIT_STUDENT_INFO } from "../action/types";

const initialState = {
    studentList: []
}

const studentReducer = (state = initialState, action, index) => { 

    switch (action.type) {
        case ADD_STUDENT_INFO:
            return {
                ...state,
                studentList: state.studentList.concat(action.payload)
            }
        case DELETE_STUDENT_INFO:
            return {
                ...state,
                studentList: state.studentList.filter((obj, index) => index !== action.payload)
            }
        case EDIT_STUDENT_INFO:
         
                let updatedList= state.studentList.map(obj => {
                    const { firstName,
                        lastName,
                        fatherFirstName,
                        fatherLastName,
                        gender,
                        dob } = action.payload
                        if(obj.dob === dob){
                            obj.firstName =firstName;
                            obj.lastName = lastName;
                            obj.fatherFirstName = fatherFirstName;
                            obj.fatherLastName = fatherLastName;
                            obj.gender = gender;
                            obj.dob = dob
                        }
                        return obj;
                })
                return {
                    ...state,
                    studentList :updatedList
                }

        default:
            return state
    }
}
export default studentReducer;