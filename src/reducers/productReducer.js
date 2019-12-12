const initialState = []

const productReducer = (oldState = initialState, action) => {
  // console.log(oldState)
  // console.log(action)

  switch (action.type) {
    case 'POPULATE_PRODUCTS': // initializing page with 50 Product
      return action.products;
    case 'CLEAN_ALL_PRODUCTS': // cleaning all products
      return;
    default:
      return oldState;
    }
  }

export default productReducer;
