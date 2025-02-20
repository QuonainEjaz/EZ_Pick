import { combineReducers } from 'redux';
import studentsReducer from './App/reducers';

const rootReducer = combineReducers({
  students: studentsReducer,
});

export default rootReducer;
