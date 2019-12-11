const initialState = {
  products: []
}

const reducer = (oldState = initialState, action) => {
  // console.log(oldState)
  // console.log(action)

  if (action.type === "ADD_PRODUCTS") {
    //add the cake
    return {
      ...oldState,
      products: [...oldState.products, action.products]
    }
  } else if (action.type === "CLEAN_ALL_PRODUCTS") {
    return {
      ...oldState,
      products: []
    }
  }

  return oldState // what's old is new again
}

export default reducer
