import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false
    }
  }

  async submit() {
    let { token } = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          token: token.id
      })
    })
    if (response.ok) console.log("Purchase Complete!")
  }


  render(){
    return(
      <div>
        <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
      </div>
    )
  }
}

export default injectStripe(Checkout);
