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
        this.component.setState({error: '', loading: false})
        this.component.props.closeSideBar(false)
      } else {
        this.component.setState({error: error, loading: false})
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
      // server response for errors
      // {:username=>["has already been taken"], :password_confirmation=>["doesn't match Password"]}
      if (errors === undefined) {
        localStorage.token = token
        localStorage.userId = user_id
        this.component.props.addUserAuth({token: token, userId: user_id})
        this.component.setState({error: '', loading: false})
        this.component.props.closeSideBar(false)
      } else {
        // debugger
        let error = ""
        if(errors["password_confirmation"] !== undefined){
          error = errors["password_confirmation"][0]
        } else {
          error = errors["username"][0]
        }
        this.component.setState({error: 'username ' + error, loading: false})
      }
    })
  }
}

export default UserService;
