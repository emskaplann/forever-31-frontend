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

  discardProductFromCard = (token, productId) => {
    fetch(`${this.workingURL}/carts/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    })
    .then(r => r.json())
    .then(response => {
      this.component.props.discardProductFromCard(response)
    })
  }

}



export default CartAndWishlistService;
