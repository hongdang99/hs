import { combineReducers } from "redux";
import TodoReducers from './TodoReducers'

const allReducers = combineReducers({
    'todos': TodoReducers,

});
export default allReducers;