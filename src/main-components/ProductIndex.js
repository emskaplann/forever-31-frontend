import React from 'react';
import ProductCardComponent from '../sub-components/ProductCardComponent.js'
import { Grid } from 'semantic-ui-react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

const renderCards = products => (
      products.map(product => (
      <Col xs={8} className='mx-auto' lg={3} style={{ marginBottom: 23 }}>
        <ProductCardComponent key={product.id} displayName={product.display_name} imgUrl={product.images[0].front_url} />
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
