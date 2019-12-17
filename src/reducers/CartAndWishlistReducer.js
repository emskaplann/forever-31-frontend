const initialState = []

const CartAndWishlistReducer = (oldState = initialState, action) => {
  // console.log(oldState)
  // console.log(action)
  switch (action.type) {
    case 'ADD_CART_AND_WISHLIST': // initializing page with users cart and wishlist
      return action.cartAndWishlist;
    case 'DISCARD_PRODUCT_FROM_CARD':
      return {...oldState, cart: action.newCart}
    case 'ADD_PRODUCT_TO_WISHLIST':
      return {...oldState, wishlist: [...oldState.wishlist, action.newProduct]}
    case 'ADD_PRODUCT_TO_CART':
      return {...oldState, cart: [...oldState.cart, {product: action.newProduct, product_images: action.newProduct.images}]}
    case 'CLEAN_CART_AND_WISHLIST': // cleaning cart and wishlist
      return {};
    default:
      return oldState;
    }
  }

export default CartAndWishlistReducer;
