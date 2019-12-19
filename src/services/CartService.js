class CartService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

  needToLogin = () => this.component.state.added ? this.component.setState({added: {visible: true, needToLogin: true}}) : console.log()

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
      this.component.state.added ? this.component.setState({added: {visible: true, type: 'cart', action: 'added to'}}) : console.log()
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
    })
  }

}

export default CartService;
