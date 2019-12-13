import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input } from 'semantic-ui-react';

class RenderProduct extends React.Component {
  constructor () {
    super ();
    this.state = {

    }
  }

  render () {
    return (
      <Row style={{marginTop: 5}}>
        <Col>
          <Card fluid image={this.props.product.images[0].front_url}/>
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
    )
  }
}

export default RenderProduct;
