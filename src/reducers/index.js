import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import studentReducer from "./studentReducers";
import employeeReducer from './employeeReducres';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    student:studentReducer,
    employee:employeeReducer
});