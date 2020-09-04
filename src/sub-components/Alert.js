import React from 'react';
import { Message } from 'semantic-ui-react';

export default class Alert extends React.Component {
  constructor () {
    super();
    this.state = {
      timer: 2
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  decreaseTimer = () => {
    if(this.state.timer !== 0){
      this.setState({timer: this.state.timer - 1})
    } else {
      this.props.closeAlert()
    }
  }

  componentWillUnmount () {
    this.props.added.needToLogin ? this.props.changeNeedToLogin() : console.log()
    clearInterval(this.interval)
  }

  render () {
    if(this.props.added.needToLogin){
      return (<Message.Header style={{textAlign: 'center', backgroundColor: '#000000', color: '#fff'}}>you need to sign in or sign up :)</Message.Header>)
    } else {
      return (<Message.Header style={{textAlign: 'center', backgroundColor: '#000000', color: '#fff'}}>{this.props.added.action} your {this.props.added.type}!</Message.Header>)
    }
  }
}
