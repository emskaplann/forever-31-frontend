import React from 'react';
import ProductCardComponent from '../sub-components/ProductCardComponent.js'
import { Container, Row, Col } from 'react-bootstrap';
import { Widget } from 'react-chat-widget';
import { connect } from 'react-redux';

import 'react-chat-widget/lib/styles.css';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

const renderCards = products => (
      products.map(product => (
      <Col xs={6} md={4} lg={3} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 23 }}>
        <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
      </Col>
    ))
)

class ProductIndex extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render(){
    return(
      <Container style={{marginTop: 50}}>
        <Row>
          {renderCards(this.props.products.flat())}
        </Row>
      </Container>
    )
  }
}


export default connect(mapStateToProps)(ProductIndex);
