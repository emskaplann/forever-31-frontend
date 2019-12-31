class WatsonService {
  constructor (component) {
    this.component = component
    this.workingURL = 'http://localhost:3000'
  }

  createWatsonSession = () => {
    fetch(`${this.workingURL}/create_watson_session`)
    .then(r => r.json())
    .then(response => {
      this.component.props.addWatsonSession(response)
      localStorage.watsonSessionId = response
    })
  }

  sendNewUserMessage = message => {
    fetch(`${this.workingURL}/post_input_to_watson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({
        session_id: this.component.props.user.watsonSessionId,
        input: message
      })
    })
    .then(r => r.json())
    .then(response => {
      debugger
    })
  }
}

export default WatsonService;
