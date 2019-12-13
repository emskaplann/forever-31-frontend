class UserService {
  constructor(component) {
    this.component = component
    // this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    this.workingURL = 'http://localhost:3000'
  }

  login = (user) => {
    fetch(`${this.workingURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify(user)
    })
    .then(r => r.json())
    .then((token, user_id, errors) => {
      if (errors.length === 0) {
        localStorage.token = token
        localStorage.userId = user_id
        // redux connect
      }

    })
  }
