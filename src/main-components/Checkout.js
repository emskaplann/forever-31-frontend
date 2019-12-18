import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Container, Row, Col } from 'react-bootstrap';

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false,
      isFormCompleted: false
    }
  }

  async submit() {
    if(this.state.isFormCompleted){
      let { token } = await this.props.stripe.createToken({name: "Name"});
      let response = await fetch("http://localhost:3000/charge", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token: token.id
        })
      })
      if (response.ok) console.log("Purchase Complete!")
    } else {
      // form is empty do something!
    }
  }

  handleChange = (e) => {
    if(e.complete){
      this.setState({isFormCompleted: true})
    } else {
      this.setState({isFormCompleted: false})
    }
  }


  render(){
    return(
      <Container style={{height: '98vh', marginTop: 50}} key='checkoutContainer'>
        <Row>
          <Col sm={4}>
            <p>Would you like to complete the purchase?</p>
          </Col>
          <Col sm={4}>
            <CardElement onChange={(e) => this.handleChange(e)}/>
          </Col>
          <Col sm={4}>
            <button onClick={this.submit}>Purchase</button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default injectStripe(Checkout);
