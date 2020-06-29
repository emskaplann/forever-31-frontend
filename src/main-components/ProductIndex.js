import React from 'react';
import ProductCardComponent from '../sub-components/ProductCardComponent.js'
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from 'semantic-ui-react';
import { Widget } from 'react-chat-widget';
import { connect } from 'react-redux';


import 'react-chat-widget/lib/styles.css';



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
      limit: 32
    }
  }

  addMoreProducts = () => {
      localStorage.limit = this.state.limit + 31
      fetch(`http://localhost:3000/products?start=${this.state.limit}&limit=${this.state.limit + 32}`)
      .then(r => r.json())
      .then(response => this.props.addMoreProducts(response))
      this.setState({limit: this.state.limit + 32})
  }

  render(){
    return(
      <Container className="margin-bt-nav2" style={{marginTop: 50}}>
        <Row>
          {renderCards(this.props.products.flat())}
        </Row>
        {/* <Header as='h2' onClick={this.addMoreProducts} style={{textAlign: 'center', marginBottom: 100}}>See More...</Header> */}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      addMoreProducts: (products) => {
        dispatch({
          type: 'ADD_PRODUCTS',
          products: products
        })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);
