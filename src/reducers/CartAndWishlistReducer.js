const initialState = []

const CartAndWishlistReducer = (oldState = initialState, action) => {
  // debugger
  switch (action.type) {
    case 'ADD_CART_AND_WISHLIST': // initializing page with users cart and wishlist
      return action.cartAndWishlist;
    case 'CLEAN_CART':
      return {...oldState, cart: []}
    case 'DISCARD_PRODUCT_FROM_CARD':
      return {...oldState, cart: action.newCart}
    case 'DISCARD_PRODUCT_FROM_WISHLIST':
      return {...oldState, wishlist: action.newWishlist}
    case 'ADD_PRODUCT_TO_WISHLIST':
      return {...oldState, wishlist: [...oldState.wishlist, action.newProduct]}
    case 'ADD_PRODUCT_TO_CART':
      return {...oldState, cart: [ action.newProduct, ...oldState.cart]}
    case 'CHANGE_QUANTITY_ON_CART':
      let newCart = oldState.cart.map(object => object.product.id === action.newProduct.product.id ? action.newProduct : object)
      return {...oldState, cart: [...newCart]}
    case 'CHANGE_SIZE_FOR_PRODUCT':
      const newCart2 = oldState.cart.map(object => object.product.id === action.newProduct.product.id ? action.newProduct : object)
      return {...oldState, cart: [...newCart2]}
    case 'CLEAN_CART_AND_WISHLIST': // cleaning cart and wishlist
      return {};
    default:
      return oldState;
    }
  }

export default CartAndWishlistReducer;
