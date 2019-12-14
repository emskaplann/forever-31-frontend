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
    .then(({token, user_id, error}) => {
      if (error === undefined) {
        localStorage.token = token
        localStorage.userId = user_id
        this.component.props.addUserAuth({token: token, userId: user_id})
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

}

export default UserService;
