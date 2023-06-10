import { combineReducers } from 'redux';
import customerReducer from './customerSlice';

const rootReducer = combineReducers({
    customer: customerReducer,
});

export default rootReducer;