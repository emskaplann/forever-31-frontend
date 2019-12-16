import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import CartAndWishlistReducer from './CartAndWishlistReducer.js';
import userReducer from './userReducer.js';

const reducer = combineReducers({
  products: productReducer,
  cartAndWishlist: CartAndWishlistReducer,
  user: userReducer,
})


export default reducer;
