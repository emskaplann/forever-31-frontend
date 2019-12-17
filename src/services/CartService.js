class CartService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

  addProductToCart = (productId, token) => {
    fetch(`${this.workingURL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json'
      }, body: JSON.stringify({
        product_id: productId
      })
    })
    .then(r => r.json())
    .then(response => {
      this.component.props.addProductToCart(response)
    })
  }

  changeQuantityOnCart = (product, token, minus) => {
    fetch(`${this.workingURL}/carts/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json'
      }, body: JSON.stringify({
          asd: minus
      })
    })
    .then(r => r.json())
    .then(response => {
      this.component.props.changeQuantityOnCart(response[0])
      if(this.component.state.quantity){
        this.component.setState({quantity: response[0].quantity})
      }
    })
  }

}

export default CartService;
