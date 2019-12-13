const productActionCreator = (newProducts) => {
  return {
    type: "POPULATE_PRODUCTS",
    products: newProducts
  }
}

const userAuthActionCreator = (user) => {
  return {
    type: 'ADD_USER_AUTH',
    user: user
  }
}

const actionCreators = {
  productActionCreator,
  userAuthActionCreator
}

export default actionCreators
