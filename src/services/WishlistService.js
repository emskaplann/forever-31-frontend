class WishlistService {
  constructor(component) {
    this.component = component
    this.workingURL = 'https://immense-garden-92266.herokuapp.com'
    // this.workingURL = 'http://localhost:3000'
  }

  needToLogin = () => this.component.state.added ? this.component.setState({added: {visible: true, needToLogin: true}}) : console.log()

  addProductToWishlist = (productId, token) => {
    fetch(`${this.workingURL}/wish_lists`, {
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
      this.component.props.addProductToWishlist(response)
      this.component.state.added ? this.component.setState({added: {visible: true, type: 'wishlist', action: 'added to'}}) : console.log()
    })
  }

}

export default WishlistService;
