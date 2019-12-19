import React from 'react';
import RenderProductsForCheckout from '../sub-components/RenderProductsForCheckout.js';
import CheckoutForm from '../sub-components/CheckoutForm.js';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader } from 'semantic-ui-react';
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
      paymentLoading: false,
      isFormCompleted: false,
      isNameFormCompleted: false,
      isEmailFormCompleted: false,
      name: "",
      email: ""
    }
  }

  async submit() {
    if(this.state.isFormCompleted && this.state.isNameFormCompleted && this.state.isEmailFormCompleted){
      swal({
        title: "Are you sure?",
        text: `You have totally ${this.props.cart.reduce(reducer2, 0)} item in your cart. And the total is $${this.props.cart.reduce(reducer, 0)}.`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
          this.setState({paymentLoading: true})
          let { token } = await this.props.stripe.createToken({name: "Name"});
          let response = await fetch("http://localhost:3000/charge", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: token.id
            })
          })
          if (response.ok) {
            this.setState({paymentLoading: false})
            swal("Purchase Completed!", `You made a payment total of: $${this.props.cart.reduce(reducer, 0)}`, "success");
          } else {
            this.setState({paymentLoading: false})
            swal("OOPS! Something Went Wrong :/", 'Something Causes Problem, Please Try Again Later.', "error");
          }
        } else {
          swal("You Cancelled Your Payment.");
        }
      });
    } else {
      swal("Form is Not Completed :/", `Make Sure That Name and Email Forms are Filled.`, "error");
    }
  }

  handleChange = (e) => {
    if(e.complete){
      this.setState({isFormCompleted: true})
    } else {
      this.setState({isFormCompleted: false})
    }
  }

  handleNameInputChange = (e) => this.setState({name: e.currentTarget.value}, this.state.name !== "" ? this.setState({isNameFormCompleted: true}) : this.setState({isNameFormCompleted: false}))
  handleEmailInputChange = (e) => this.setState({email: e.currentTarget.value}, this.state.email !== "" ? this.setState({isEmailFormCompleted: true}) : this.setState({isEmailFormCompleted: false}))


  render(){
    if(localStorage.token === "" || localStorage.token === undefined){
      return(<Redirect to='/' />)
    }
    else if(this.props.cart){
      return(
        <Container style={{minHeight: '98vh', marginTop: 50}} key='checkoutContainer'>
          {this.state.paymentLoading ? <Dimmer active><Loader size='big' /></Dimmer> : console.log()}
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
          {this.props.cart.length === 0 ? <><br /><Header as='h1'>You don't have any item in your cart... <Link to='/' style={{color: '#000000'}}><u>Would you like to browse around limitless design?</u></Link></Header><br /></> : console.log()}
          <Divider />
          {/* Checkout Form */}
          <CheckoutForm isNameFormCompleted={this.state.isNameFormCompleted} isEmailFormCompleted={this.state.isEmailFormCompleted} handleChange={this.handleChange} handleName={this.handleNameInputChange} handleEmail={this.handleEmailInputChange} total={this.props.cart.reduce(reducer, 0)} itemCount={this.props.cart.reduce(reducer2, 0)} submit={this.submit}/>
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
