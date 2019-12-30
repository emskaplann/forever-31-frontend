import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader } from 'semantic-ui-react';

class ProductShow extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render () {
    return(
      <Container>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductShow);
