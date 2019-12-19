import React from 'react';
import RenderProductsForCheckout from '../sub-components/RenderProductsForCheckout.js';
import CheckoutForm from '../sub-components/CheckoutForm.js';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Container, Row, Col } from 'react-bootstrap';
import { Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

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
      swal("Purchase Completed!", `You made a payment total of: $${this.props.cart.reduce(reducer, 0)}`, "success");
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
    if(localStorage.token === "" || localStorage.token === undefined){
      return(<Redirect to='/' />)
    }
    else if(this.props.cart){
      return(
        <Container style={{minHeight: '98vh', marginTop: 50}} key='checkoutContainer'>
          <Header as='h1' dividing>Checkout</Header>
          <Row>
            <Col style={{textAlign: 'left', fontWeight: 'bold', fontSize: '130%'}} xs={6} sm={6} md={6} lg={6}>
              Total: ${this.props.cart.reduce(reducer, 0)}
            </Col>
            <Col style={{textAlign: 'right', fontWeight: 'bold', fontSize: '130%'}} xs={6} sm={6} md={6} lg={6}>
              Item Count: {this.props.cart.reduce(reducer2, 0)}
            </Col>
          </Row>
          <RenderProductsForCheckout/>
          <Divider />
          {/* Checkout Form */}
          <CheckoutForm handleChange={this.handleChange} total={this.props.cart.reduce(reducer, 0)} itemCount={this.props.cart.reduce(reducer2, 0)} submit={this.submit}/>
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

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cartAndWishlist.cart,
    user: state.user
  }
}

export default connect(mapStateToProps)(injectStripe(Checkout));
