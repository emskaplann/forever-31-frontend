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
    .then(({token, user_id, errors}) => {
      if (errors === undefined) {
        debugger
        localStorage.token = token
        localStorage.userId = user_id
        this.component.props.addUserAuth({token: token, userId: user_id})
        this.component.props.closeSideBar(false)
      }
    })
  }
}

export default UserService;
