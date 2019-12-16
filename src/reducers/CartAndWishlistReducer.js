const initialState = []

const CartAndWishlistReducer = (oldState = initialState, action) => {
  // console.log(oldState)
  // console.log(action)
  switch (action.type) {
    case 'ADD_CART_AND_WISHLIST': // initializing page with users cart and wishlist
      return action.cartAndWishlist;
    case 'DISCARD_PRODUCT_FROM_CARD':
      return {...oldState, cart: action.newCart}
    case 'CLEAN_CART_AND_WISHLIST': // cleaning cart and wishlist
      return {};
    default:
      return oldState;
    }
  }

export default CartAndWishlistReducer;
