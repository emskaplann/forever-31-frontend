import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeCheckout extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false
    }
  }

  async submit(ev) {
  let { token } = await this.props.stripe.createToken({name: "Name"});
  console.log(token)
  let response = await fetch("http://localhost:3000/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        token: token.id
    })
  })
  console.log(response)

  if (response.ok) console.log("Purchase Complete!")
}

  render(){
    return(
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    )
  }
}

export default injectStripe(StripeCheckout);
