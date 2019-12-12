import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Grid } from 'semantic-ui-react';

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
      <Grid centered container style={{height: '98vh'}} key='checkoutContainer'>
        <Grid.Row>
          <Grid.Column width={5}>
            <p>Would you like to complete the purchase?</p>
          </Grid.Column>
          <Grid.Column width={5}>
            <CardElement />
          </Grid.Column>
          <Grid.Column width={5}>
            <button onClick={this.submit}>Purchase</button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default injectStripe(Checkout);
