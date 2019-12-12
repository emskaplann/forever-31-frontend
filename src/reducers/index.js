import { combineReducers } from 'redux';
import productReducer from './productReducer.js';

const reducer = combineReducers({
  products: productReducer,
})


export default reducer;
