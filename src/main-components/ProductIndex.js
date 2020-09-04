import React from 'react';
import ProductCardComponent from '../sub-components/ProductCardComponent.js'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import AliceCarousel from 'react-alice-carousel'

import 'react-chat-widget/lib/styles.css';
import "react-alice-carousel/lib/alice-carousel.css";



const productCarousel = products => {
  const handleOnDragStart = (e) => e.preventDefault()
  let transformedProducts = products.reverse().slice(0,6).map(product => (
    <Col xs={6} md={4} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 10}}>
      <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
    </Col>
  ))
  let transformedProducts2 = products.reverse().slice(6,12).map(product => (
    <Col xs={6} md={4} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 10}}>
      <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
    </Col>
  ))
  return (
    <AliceCarousel items={6} buttonsDisabled={false} swipeDisabled={true} dotsDisabled={true} mouseTrackingEnabled>
      <Row>{transformedProducts}</Row>
      <Row>{transformedProducts2}</Row>
    </AliceCarousel>
  )
}

const productCarousel2 = products => {
  const handleOnDragStart = (e) => e.preventDefault()
  let transformedProducts = products.reverse().slice(6,12).map(product => (
    <Col xs={6} md={4} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 10}}>
      <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
    </Col>
  ))
  let transformedProducts2 = products.reverse().slice(12,18).map(product => (
    <Col xs={6} md={4} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 10}}>
      <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
    </Col>
  ))
  return (
    <AliceCarousel items={6} buttonsDisabled={false} swipeDisabled={true} dotsDisabled={true} mouseTrackingEnabled>
      <Row>{transformedProducts}</Row>
      <Row>{transformedProducts2}</Row>
    </AliceCarousel>
  )
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
      limit: 32,
      isMobile: false,
    }
  }

  componentDidMount() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.setState({isMobile})
  }

  addMoreProducts = () => {
      localStorage.limit = this.state.limit + 31
      fetch(`http://localhost:3000/products?start=${this.state.limit}&limit=${this.state.limit + 32}`)
      .then(r => r.json())
      .then(response => this.props.addMoreProducts(response))
      this.setState({limit: this.state.limit + 32})
  }

  renderFancyAds = () => {
    if(this.state.isMobile) {
      return;
    } else {
      return(
        <>
        <Image fluid={true} src="https://www.forever21.com/images/f21/us/en/web/20200320/0903_GLOBAL_APP_DWNLD_20OFF_50_D_B_013426_f21.jpg?1" alt="Homepage Promo Banner"/>
        <br /><br />

        <Image fluid={true} src="https://www.forever21.com/images/f21/us/en/web/20200211/0904_WGA_30OFF75_LDW30_D_M_013953_f21.jpg?1" alt="30% off $75+ purchase i code: ldw30 - home m1"/>
        <br />

        <Divider horizontal>Just For You</Divider>
        <Row>
          {productCarousel(this.props.products.flat())}
        </Row>

        <Image fluid={true} src="https://www.forever21.com/images/f21/us/en/web/20200206/0903_global_30offfall_D_B_01_080727_f21.jpg?1" alt="30% off fall essentials - gb2"/>
        <br /><br />

        <Image fluid={true} src="https://www.forever21.com/images/f21/us/en/web/20200211/0901_WGA_LOUNGEWEAR_D_M_214231_f21.jpg?1" alt="wga loungewear sets - home m2"/>
        <br />

        <Divider horizontal>New Arrivals</Divider>
        <Row>
          {productCarousel2(this.props.products.flat())}
        </Row>

        <Image fluid={true} src="https://www.forever21.com/images/f21/us/en/web/20200407/0821_WGA_BASICS_D_M_073539_f21.jpg?1" alt="wga forever basics - home m3"/>
        <br />
        </>
      );
    }
  }

  render(){
    return(
      <Container className="margin-bt-nav2" style={{marginTop: 50}}>

        {this.renderFancyAds()}

        <Divider horizontal>All Products</Divider>
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
