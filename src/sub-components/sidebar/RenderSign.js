import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { Card, Icon, Input, Button } from 'semantic-ui-react';
import UserService from '../../services/UserService.js';
import actionCreators from '../../actionCreators.js';

class RenderSign extends React.Component {
  constructor () {
    super();
    this.state = {
      signUp: false,
      username: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    }
    this.userService = new UserService(this)
  }

  renderPasswordConfirmation = () => {
    if(this.state.signUp){
      return (
        <Row className='justify-content-center' style={{marginTop: 5}}>
          <Input style={{width: '65%'}} iconPosition='left' type='password' placeholder='Password Confirmation'>
            <Icon name='key' />
            <input onChange={text => this.setState({passwordConfirmation: text.target.value})}/>
          </Input>
        </Row>
      )
    }
  }
// signing in or signing up => more details in src/services/UserService.js
  handleSubmit = () => {
    const state = this.state
    if(!state.signUp){
      const user = {
        username: state.username,
        password: state.password
      }
      this.userService.login(user)
    } else {
      const user = {
        username: state.username,
        password: state.password,
        password_confirmation: state.passwordConfirmation
      }
      this.userService.signUp(user)
    }
  }

  render () {
    return (
      <>
      <Header as='h2' style={{color: '#fff', marginTop: 5}}>
        {this.state.signUp ? 'Sign Up' : 'Sign In'} or <span onClick={() => this.setState({signUp: !this.state.signUp})}>{!this.state.signUp ? 'Sign Up' : 'Sign In'}</span>
      </Header>
        {this.state.error !== "" ? <Alert key={1} variant='danger'>{this.state.error}</Alert> : null }
      <Row className='justify-content-center'>
        <Input style={{width: '65%'}} iconPosition='left' placeholder='Email'>
          <Icon name='at' />
          <input onChange={text => this.setState({username: text.target.value})} />
        </Input>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 5}}>
        <Input style={{width: '65%'}} iconPosition='left' type='password' placeholder='Password'>
          <Icon name='key' />
          <input onChange={text => this.setState({password: text.target.value})} />
        </Input>
      </Row>
      {this.renderPasswordConfirmation()}
      <Row style={{marginTop: 5}}>
        <Col sm={7}>
        </Col>
        <Col sm={4}>
        <Button onClick={() => this.handleSubmit()} basic inverted>
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

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      addUserAuth: (user) => {
        dispatch({
          type: 'ADD_USER_AUTH',
          user: user
        })
    }
  }
}

export default connect(undefined, mapDispatchToProps)(RenderSign);
