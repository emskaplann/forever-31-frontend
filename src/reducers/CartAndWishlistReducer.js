const initialState = []

const CartAndWishlistReducer = (oldState = initialState, action) => {
  // debugger
  switch (action.type) {
    case 'ADD_CART_AND_WISHLIST': // initializing page with users cart and wishlist
      return action.cartAndWishlist;
    case 'DISCARD_PRODUCT_FROM_CARD':
      return {...oldState, cart: action.newCart}
    case 'ADD_PRODUCT_TO_WISHLIST':
      return {...oldState, wishlist: [...oldState.wishlist, action.newProduct]}
    case 'ADD_PRODUCT_TO_CART':
      return {...oldState, cart: [...oldState.cart, action.newProduct]}
    case 'CHANGE_QUANTITY_ON_CART':
      oldState.cart.find(object => object.product.id === action.newProduct.product.id).quantity = action.newProduct.quantity
      return {...oldState}
    case 'CLEAN_CART_AND_WISHLIST': // cleaning cart and wishlist
      return {};
    default:
      return oldState;
    }
  }

export default CartAndWishlistReducer;
