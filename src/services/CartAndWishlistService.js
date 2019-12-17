class CartAndWishlistService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

  fetchCartAndWishlist = (token) => {
    // cart fetch
    fetch(`${this.workingURL}/carts`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
    .then(r => r.json())
    .then(responseCart => {
      // wishlist fetch
      fetch(`${this.workingURL}/wish_lists`, {
        method: 'GET',
        headers: {
          Authorization: token
        }
      })
      .then(r => r.json())
      .then(responseWishlist => {
        let cartAndWishlist = {cart: responseCart, wishlist: responseWishlist}
        this.component.setState({contentId: 1})
        this.component.props.addCartAndWishlist(cartAndWishlist)
      })
    })
  }

  discardProductFromCart = (token, productId) => {
    fetch(`${this.workingURL}/carts/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    })
    .then(r => r.json())
    .then(response => {
      this.component.props.discardProductFromCart(response)
      this.component.state.loading ? this.component.setState({loading: false}) : console.log()
      this.component.state.added ? this.component.setState({added: {visible: true, type: 'cart', action: 'removed from'}}) : console.log()
    })
  }

  discardProductFromWishlist = (token, productId) => {
    fetch(`${this.workingURL}/wish_lists/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    })
    .then(r => r.json())
    .then(response => {
      this.component.props.discardProductFromWishlist(response)
      this.component.state.loading ? this.component.setState({loading: false}) : console.log()
      this.component.state.added ? this.component.setState({added: {visible: true, type: 'wishlist', action: 'removed from'}}) : console.log()
    })
  }

}



export default CartAndWishlistService;
