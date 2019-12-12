const productActionCreator = (newProducts) => {
  return {
    type: "POPULATE_PRODUCTS",
    products: newProducts
  }
}

const actionCreators = {
  productActionCreator //: cakeActionCreator
}

export default actionCreators
