import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input, Button } from 'semantic-ui-react';

class RenderSign extends React.Component {
  constructor () {
    super();
    this.state = {
      signUp: false
    }
  }

  renderPasswordConfirmation = () => {
    if(this.state.signUp){
      return (
        <Row className='justify-content-center' style={{marginTop: 5}}>
          <Input style={{width: '65%'}} iconPosition='left' type='password' placeholder='Password Confirmation'>
            <Icon name='key' />
            <input />
          </Input>
        </Row>
      )
    }
  }

  render () {
    return (
      <>
      <Header as='h2' style={{color: '#fff', marginTop: 5}}>
        {this.state.signUp ? 'Sign Up' : 'Sign In'} or <span onClick={() => this.setState({signUp: !this.state.signUp})}>{!this.state.signUp ? 'Sign Up' : 'Sign In'}</span>
      </Header>
      <Row className='justify-content-center'>
        <Input style={{width: '65%'}} iconPosition='left' placeholder='Email'>
          <Icon name='at' />
          <input />
        </Input>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 5}}>
        <Input style={{width: '65%'}} iconPosition='left' type='password' placeholder='Password'>
          <Icon name='key' />
          <input />
        </Input>
      </Row>
      {this.renderPasswordConfirmation()}
      <Row style={{marginTop: 5}}>
        <Col sm={7}>
        </Col>
        <Col sm={4}>
        <Button basic inverted>
          {this.state.signUp ? 'Sign Up!' : 'Sign In!'}
        </Button>
        </Col>
        <Col sm={1}>
        </Col>
      </Row>
      </>
    )
  }
}

export default RenderSign;
