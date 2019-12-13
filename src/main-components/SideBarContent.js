import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { Card } from 'semantic-ui-react'

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

class SideBarContent extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  renderProducts = () => {
    return this.props.products.map(product => (
      <Row style={{marginTop: 5}}>
        <Col>
          <Card fluid image={product.images[0].front_url}/>
        </Col>
        <Col>
        </Col>
        <Col>
          <Card fluid style={{backgroundColor: '#212529'}}>
            <Card.Header style={{color: '#fff'}}>
              $12.99
            </Card.Header>
          </Card>
        </Col>
      </Row>
    ))
  }

  render () {
    return(
      <Container>
        {this.renderProducts()}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(SideBarContent);
