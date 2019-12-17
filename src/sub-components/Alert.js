import React from 'react';
import { Message } from 'semantic-ui-react';
import posed, { PoseGroup } from 'react-pose';

const AlertCover = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
      default: { ease: 'linear', duration: 500 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 500 }
  }
});

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
    this.setState({timer: this.state.timer - 1})
  }

  render () {
    this.state.timer === 0 ? this.props.closeAlert() : console.log()
    return (
      <AlertCover>
       <Message size='small' success={this.state.loading}>
          <Message.Content>
            <Message.Header style={{textAlign: 'center'}}>{this.props.added.action} your {this.props.added.type}!</Message.Header>
          </Message.Content>
        </Message>
      </AlertCover>
    )
  }
}
