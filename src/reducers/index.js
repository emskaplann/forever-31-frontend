import { combineReducers } from 'redux';
import productReducer from './productReducer.js';

const reducer = combineReducers({
  products: productReducer,
  user: userReducer,
})


export default reducer;
