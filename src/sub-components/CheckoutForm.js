import React from 'react';
import UserService from '../services/UserService.js';
import { connect } from 'react-redux';
import { Divider, Input, Image, Button } from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';
import { CardElement } from 'react-stripe-elements';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        }
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class CheckoutForm extends React.Component {
  constructor () {
    super();
    this.state = {
      changeShippingAddress: false,
      lineOne: "",
      lineTwo: "",
      emptyForm: true,
    }
    this.userService = new UserService(this)
  }

  componentWillMount () {
    if(this.props.user.address.line_1 !== ""){
      this.setState({changeShippingAddress: false, lineOne: this.props.user.address.line_1 !== null ? this.props.user.address.line_1 : "", lineTwo: this.props.user.address.line_2 !== null ? this.props.user.address.line_2 : "", emptyForm: false})
    } else {
      this.setState({changeShippingAddress: true, emptyForm: true})
    }
  }

  handleInputChangeLineOne = (event) => this.setState({lineOne: event.currentTarget.value}, () => {this.state.lineOne !== "" ? this.setState({emptyForm: false}) : this.setState({emptyForm: true})})
  handleInputChangeLineTwo = (event) => this.setState({lineTwo: event.currentTarget.value})
  openOrCloseShippingAdressForm = () => this.setState({changeShippingAddress: !this.state.changeShippingAddress}, () => this.props.user.address.line_1 !== "" ? this.setState({lineOne: this.props.user.address.line_1}, () => {this.setState({lineTwo: this.props.user.address.line_2})}) : console.log())
  saveNewAddress = () => {
    if (this.state.lineOne !== "") {
      if (this.props.user.address.line_1 !== ""){
        this.userService.saveNewAddress(this.state.lineOne, this.state.lineTwo)
      } else {
        this.userService.createAddress(this.state.lineOne, this.state.lineTwo)
      }
    } else {
      this.setState({emptyForm: true})
    }
  }

  render () {
    return (
      <>
        <Row>
          {/* Add Conditional Rendering! */}
          <Col style={{color: '#6b7c93', textAlign: 'left'}} xs={2} sm={2} md={2} lg={2}>
            Shipping Adress:
          </Col>
          <Col xs={7} sm={9} md={9} lg={9} style={{justifyContent: "center"}}>
              <Col xs={10} sm={10} md={10} lg={10}>
                 <div style={{ letterSpacing: '0.025em'}}>{this.state.changeShippingAddress ? <Input value={this.state.lineOne} error={this.state.emptyForm} onChange={this.handleInputChangeLineOne} size='mini' style={{width: '100%'}} placeholder='Adress Line 1...' /> : this.props.user.address.line_1}</div>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                 <div style={{ letterSpacing: '0.025em'}}>{this.state.changeShippingAddress ? <Input value={this.state.lineTwo} onChange={this.handleInputChangeLineTwo} size='mini' style={{width: '100%', marginTop: 10}} placeholder='Adress Line 2...' /> : this.props.user.address.line_2}</div>
              </Col>
          </Col>
          <Col style={{textAlign: 'right'}} xs={3} sm={1} md={1} lg={1}>
            {this.state.changeShippingAddress ? <><span onClick={this.openOrCloseShippingAdressForm}>Cancel</span><span onClick={this.saveNewAddress} style={{marginLeft: 4}}>Save</span></> : <span onClick={this.openOrCloseShippingAdressForm}>Change</span>}
          </Col>
        </Row>
        <Divider />
        <Row style={{textAlign: 'left', marginTop: 10, marginBottom: 20}}>
          <Col xs={12} md={8} sm={8}>
          <Row style={{marginBottom: 20}}>
            <Col xs={6} sm={6} style={{marginBottom: 10}}>
              <label style={{color: '#6b7c93', letterSpacing: '0.025em'}}>
                Name on Card
                <br />
                <Input error={!this.props.isNameFormCompleted} onChange={this.props.handleName} placeholder='Jack Willerson' size='mini'/>
              </label>
            </Col>
            <Col xs={6} sm={6}>
              <label style={{color: '#6b7c93', letterSpacing: '0.025em'}}>
                Email
                <br />
                <Input error={!this.props.isEmailFormCompleted} onChange={this.props.handleEmail} placeholder='example@example.com' size='mini'/>
              </label>
            </Col>
            <Col style={{ marginTop: 15}} xs={12} md={8} sm={10} lg={9}>
              <CardElement {...createOptions()} onChange={(e) => this.props.handleChange(e)}/>
            </Col>
            <Col style={{marginTop: 8}} xs={12} md={4} lg={3} sm={2}>
              <Button style={{ textAlign: 'center'}} fluid onClick={this.props.submit}>Pay ${this.props.total}</Button>
            </Col>
          </Row>
          </Col>
          <Col xs={6} md={4} sm={4}>
            <Image style={{float: 'right'}} src='/images/stripe-secure-badge.png'></Image>
          </Col>
          <Col sm={2} md={2} xs={3} style={{fontWeight: 'bold', fontSize: 15}}>
            Total: ${this.props.total}
          </Col>
          <Col sm={2} md={2} xs={3} style={{fontWeight: 'bold', fontSize: 15}}>
            Item Count: {this.props.itemCount}
          </Col>
        </Row>
        <br /><br />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      addAddress: (address) => {
        dispatch({
          type: 'ADD_ADDRESS',
          address: address
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
