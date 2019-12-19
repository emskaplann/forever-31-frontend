import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { Container, Row, Col } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render () {
    return (
      <Row style={{textAlign: 'center'}}>
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
    )
  }
}

export default CheckoutForm;
