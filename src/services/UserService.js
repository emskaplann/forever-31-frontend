class UserService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

  login = (user) => {
    fetch(`${this.workingURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({
        user
      })
    })
    .then(r => r.json())
    .then(({token, user_id, address, error}) => {
      if (error === undefined) {
        localStorage.token = token
        localStorage.userId = user_id
        if(address){
          localStorage.addressLineOne = address.line_1
          localStorage.addressLineTwo = address.line_2
        }
        this.component.props.addUserAuth({token: token, userId: user_id, address: address})
        this.component.cartAndWishlistService.fetchCartAndWishlist(token)
        this.component.setState({errors: [], loading: false})
        this.component.props.closeSideBar(false)
      } else {
        this.component.setState({errors: [ error ], loading: false})
      }
    })
  }

  signUp = (user) => {
    fetch(`${this.workingURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({ user })
    })
    .then(r => r.json())
    .then(({token, user_id, errors}) => {
      // example of server response for multiple errors
      // {:username=>["has already been taken"], :password_confirmation=>["doesn't match Password"]}
      if (errors === undefined) {
        localStorage.token = token
        localStorage.userId = user_id
        this.component.props.addUserAuth({token: token, userId: user_id})
        this.component.cartAndWishlistService.fetchCartAndWishlist(token)
        this.component.setState({error: '', loading: false})
        this.component.props.closeSideBar(false)
      } else {
        this.component.setState({errors: Object.values(errors).flat().map(er => er.includes('already') ? 'username ' + er.toLowerCase() : er.toLowerCase()), loading: false})
      }
    })
  }

  getAllUserNames = () => {
    fetch(`${this.workingURL}/users`)
    .then(r => r.json())
    .then(response => {
      this.component.setState({usernames: response})
    })
  }

  createAddress = (lineOne, lineTwo) => {
    fetch(`${this.workingURL}/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.component.props.user.token
      }, body: JSON.stringify({address: { line_1: lineOne, line_2: lineTwo, user_id: this.component.props.user.userId }})
    })
    .then(r => r.json())
    .then(response => {
      localStorage.addressLineOne = response.line_1
      localStorage.addressLineTwo = response.line_2
      this.component.props.addAddress({line_1: response.line_1, line_2: response.line_2})
      this.component.setState({changeShippingAddress: false})
    })
  }

  saveNewAddress = (lineOne, lineTwo) => {
    fetch(`${this.workingURL}/addresses/${this.component.props.user.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.component.props.user.token
      }, body: JSON.stringify({address: { line_1: lineOne, line_2: lineTwo, user_id: this.component.props.user.userId }})
    })
    .then(r => r.json())
    .then(response => {
      localStorage.addressLineOne = response.line_1
      localStorage.addressLineTwo = response.line_2
      this.component.props.addAddress({line_1: response.line_1, line_2: response.line_2})
      this.component.setState({changeShippingAddress: false})
    })
  }

}

export default UserService;
