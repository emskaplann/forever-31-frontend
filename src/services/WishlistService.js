class WishlistService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

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
