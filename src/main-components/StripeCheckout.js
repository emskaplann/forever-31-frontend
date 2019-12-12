import React from 'react';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';

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
      <StripeProvider apiKey="pk_test_YJZiIQadCitjxkefrqHysj0g00BNRtnusD">
        <div>
          <Elements>
            <p>Would you like to complete the purchase?</p>
              <CardElement />
            <button onClick={this.submit}>Purchase</button>
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default injectStripe(StripeCheckout);
