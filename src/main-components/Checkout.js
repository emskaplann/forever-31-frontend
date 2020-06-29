import React from 'react';
import RenderProductsForCheckout from '../sub-components/RenderProductsForCheckout.js';
import CheckoutForm from '../sub-components/CheckoutForm.js';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Container, Row, Col } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect,  Link } from 'react-router-dom';
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
      orderAmount: 0,
      name: "",
      email: "",
      redirect: false
    }
  }

  async submit() {
    if(this.state.isFormCompleted && this.state.isNameFormCompleted && this.state.isEmailFormCompleted){
      this.setState({orderAmount: this.props.cart.reduce(reducer, 0)})
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
          let { token } = await this.props.stripe.createToken({name: this.state.name, address_line1: this.props.user.address.line_1, address_line2: this.props.user.address.line_2});
          let response = await fetch("https://immense-garden-92266.herokuapp.com/charge", {
            method: "POST",
            headers: {"Content-Type": "application/json", Accept: "application/json", Authorization: this.props.user.token},
            body: JSON.stringify({
                token: token.id,
                name: this.state.name,
                email: this.state.email,
                amount: this.props.cart.reduce(reducer, 1) * 100,
                items: this.props.cart.map(object => object.product.id).join(' - ')
            })
          })
          // debugger
          if (response.ok) {
            this.props.cleanCart()
            this.setState({paymentLoading: false})
            swal("Purchase Completed!", `You made a payment total of: $${this.state.orderAmount}`, "success")
            .then((value) => {
              this.setState({redirect: true})
            })
          } else {
            this.setState({paymentLoading: false})
            swal("OOPS! Something Went Wrong :/", 'Something Causes Problem, Please Try Again Later.', "error")
          }
        } else {
          this.setState({paymentLoading: false})
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
      return(<Redirect to='/forever-31-frontend' />)
    }
    else if(this.props.cart){
      return(
        <Container style={{minHeight: '98vh', marginTop: 50, marginBottom: 50}} key='checkoutContainer'>
          {this.state.paymentLoading ? <Dimmer active><Loader size='big' /></Dimmer> : console.log()}
          { this.state.redirect ? <Redirect to='/forever-31-frontend' /> : console.log() }
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
          {this.props.cart.length === 0 ? <><br /><Header as='h1'>You don't have any item in your cart... <Link to='/forever-31-frontend' style={{color: '#000000'}}><u>Would you like to browse around our designs?</u></Link></Header><br /></> : console.log()}
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

const mapDispatchToProps = (dispatch, mergeProps) => {
  return {
      cleanCart: (address) => {
        dispatch({
          type: 'CLEAN_CART',
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(Checkout));
