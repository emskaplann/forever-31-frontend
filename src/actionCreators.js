const productActionCreator = (newProducts) => {
  return {
    type: "ADD_PRODUCTS",
    products: newProducts
  }
}

const actionCreators = {
  productActionCreator //: cakeActionCreator
}

export default actionCreators
