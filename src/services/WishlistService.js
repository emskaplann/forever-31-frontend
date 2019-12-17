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
      console.log(response)
    })
  }

}

export default WishlistService;
