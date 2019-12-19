import React from 'react';
import UserService from '../services/UserService.js';
import { connect } from 'react-redux';
import { Header, Divider, Input } from 'semantic-ui-react';
import { Container, Row, Col } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';

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
      this.setState({changeShippingAddress: false, lineOne: this.props.user.address.line_1, lineTwo: this.props.user.address.line_2, emptyForm: false})
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
          <Col style={{textAlign: 'left'}} xs={3} sm={2} md={2} lg={2}>
            Shipping Adress:
          </Col>
          <Col xs={8} sm={9} md={9} lg={9}>
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                {this.state.changeShippingAddress ? <Input value={this.state.lineOne} error={this.state.emptyForm} onChange={this.handleInputChangeLineOne} size='mini' style={{width: '100%'}} placeholder='Adress Line 1...' /> : this.props.user.address.line_1}
              </Col>
            </Row>
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                {this.state.changeShippingAddress ? <Input value={this.state.lineTwo} onChange={this.handleInputChangeLineTwo} size='mini' style={{width: '100%', marginTop: 10}} placeholder='Adress Line 2...' /> : this.props.user.address.line_2}
              </Col>
            </Row>
          </Col>
          <Col style={{textAlign: 'right'}} xs={1} sm={1} md={1} lg={1}>
            {this.state.changeShippingAddress ? <><span onClick={this.openOrCloseShippingAdressForm}>Cancel</span><span onClick={this.saveNewAddress} style={{marginLeft: 4}}>Save</span></> : <span onClick={this.openOrCloseShippingAdressForm}>Change</span>}
          </Col>
        </Row>
        <Divider />
        <Row style={{textAlign: 'center', marginTop: 20}}>
          <Col sm={4}>
            <p>Would you like to complete the purchase?</p>
          </Col>
          <Col sm={4}>
            <CardElement onChange={(e) => this.props.handleChange(e)}/>
          </Col>
          <Col sm={4}>
            <button onClick={this.props.submit}>Purchase</button>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
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
