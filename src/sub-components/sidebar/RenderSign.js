import React from 'react';
import { connect } from 'react-redux';
import { Header, Message } from 'semantic-ui-react';
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Loader, Input, Button } from 'semantic-ui-react';
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
      errors: [],
      loading: false,
      passwordMatch: false,
      usernames: [],
      uniqueUsername: true,
    }
    this.userService = new UserService(this)
  }

  componentDidMount () {
    this.userService.getAllUserNames()
  }

  renderPasswordConfirmation = () => {
    if(this.state.signUp){
      return (
        <Row className='justify-content-center' style={{marginTop: 5}}>
          <Input style={{width: '65%'}} error={!this.state.passwordMatch} iconPosition='left' type='password' placeholder='Password Confirmation'>
            <Icon name='key' loading={true}/>
            <input onChange={text => this.handleChangeOnConfirmation(text)}/>
          </Input>
        </Row>
      )
    }
  }

  handleChangeOnUsername = (text) => {
    this.setState({username: text.target.value}, () => (
      this.state.usernames.includes(this.state.username) ? this.setState({uniqueUsername: false}) : this.setState({uniqueUsername: true})
    ))
  }

  handleChangeOnConfirmation = (text) => {
    // checking if password and password confirmation does match
    this.setState({passwordConfirmation: text.target.value}, () => (
      this.state.password !== this.state.passwordConfirmation ? this.setState({passwordMatch: false}) : this.setState({passwordMatch: true})
    ))
  }

// signing in or signing up => more details in src/services/UserService.js
  handleSubmit = () => {
    const state = this.state
    if(!state.signUp){
      const user = {
        username: state.username,
        password: state.password
      }
      this.setState({loading: true})
      this.userService.login(user)
    } else {
      const user = {
        username: state.username,
        password: state.password,
        password_confirmation: state.passwordConfirmation
      }
      this.setState({loading: true})
      this.userService.signUp(user)
    }
  }

  render () {
    return (
      <>
      <Header as='h2' style={{color: '#fff', marginTop: 5}}>
        {this.state.signUp ? 'Sign Up' : 'Sign In'} or <span onClick={() => this.setState({signUp: !this.state.signUp})}>{!this.state.signUp ? 'Sign Up' : 'Sign In'}</span>
        {this.state.loading ? <Loader active inline style={{marginLeft: 10}} /> : null}
      </Header>
      <Row className='justify-content-center'>
        {this.state.errors.length !== 0 ? <Message color='red' list={this.state.errors} header='oops, something went wrong!'/> : null }
        {/* USERNAME FIELD */}
        <Input style={{width: '65%'}} error={!this.state.uniqueUsername} iconPosition='left' placeholder='Email'>
          <Icon name='at' />
          <input onChange={text => this.handleChangeOnUsername(text)} />
        </Input>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 5}}>
        {/* PASSWORD FIELD */}
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
