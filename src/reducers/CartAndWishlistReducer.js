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
      const newCart = oldState.cart.filter(object => object.product.id !== action.newProduct.product.id)
      return {...oldState, cart: [...newCart, action.newProduct]}
    case 'CLEAN_CART_AND_WISHLIST': // cleaning cart and wishlist
      return {};
    default:
      return oldState;
    }
  }

export default CartAndWishlistReducer;
