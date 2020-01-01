class WatsonService {
  constructor (component) {
    this.component = component
    this.workingURL = 'http://localhost:3000'
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
      // debugger
      console.log(response)
      if(response.session_id){
        this.component.props.addWatsonSession(response.session_id)
        localStorage.watsonSessionId = response.session_id
        if(response.original_response.output.generic[0].response_type === "text"){
          this.component.addResponseMessage(response.original_response.output.generic[0].text)
        } else {
          this.component.addResponseMessage("Can you rephrase? I didn't understand...")
        }
      } else {
        if(response.original_response.output.generic[0].response_type === "text"){
          this.component.addResponseMessage(response.original_response.output.generic[0].text)
        } else {
          this.component.addResponseMessage("Can you rephrase? I didn't understand...")
        }
      }
    })
  }
}

export default WatsonService;
