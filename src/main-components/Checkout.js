import React from 'react';
import RenderProductsForCheckout from '../sub-components/RenderProductsForCheckout.js';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from 'semantic-ui-react';

// reducers for cart's total and item count
const reducer = (accumulator, currentValue) => accumulator + (parseInt(currentValue.quantity) * parseInt(currentValue.product.list_price.replace('$', '')));
const reducer2 = (accumulator, currentValue) => accumulator + (currentValue.quantity)
// reducer for wishlist's total
const reducer3 = (accumulator, currentValue) => accumulator + parseInt(currentValue.product.list_price.replace('$', ''));


class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false,
      isFormCompleted: false,
      cart: []
    }
  }

  setCart = cart => this.setState({cart: cart})

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
    if(this.state.cart){
      return(
        <Container style={{minHeight: '98vh', marginTop: 50}} key='checkoutContainer'>
          <Header as='h1' dividing>CheckOut</Header>
          <Row>
            <Col style={{textAlign: 'left', fontWeight: 'bold', fontSize: '130%'}} xs={6} sm={6} md={6} lg={6}>
              Total: ${this.state.cart.reduce(reducer, 0)}
            </Col>
            <Col style={{textAlign: 'right', fontWeight: 'bold', fontSize: '130%'}} xs={6} sm={6} md={6} lg={6}>
              Item Count: {this.state.cart.reduce(reducer2, 0)}
            </Col>
          </Row>
          <RenderProductsForCheckout setCart={this.setCart}/>
        </Container>
      )
    } else {
      return(
        <>
        </>
      )
    }
  }
}

export default injectStripe(Checkout);




// card form
// <Row>
//   <Col sm={4}>
//     <p>Would you like to complete the purchase?</p>
//   </Col>
//   <Col sm={4}>
//     <CardElement onChange={(e) => this.handleChange(e)}/>
//   </Col>
//   <Col sm={4}>
//     <button onClick={this.submit}>Purchase</button>
//   </Col>
// </Row>
