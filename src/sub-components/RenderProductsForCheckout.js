import React from 'react';
import CartAndWishlistService from '../services/CartAndWishlistService.js';
import CartService from '../services/CartService.js';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Image, Icon, Divider } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

class RenderProductsForCheckout extends React.Component {
  constructor () {
    super();
    this.state = {

    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.cartService = new CartService(this)
  }

  discardProductFromCart = (productId) => this.cartAndWishlistService.discardProductFromCart(this.props.user.token, productId)

  handleDecreasingQuantity = (object, token, minus) => {
    if(object.quantity === 1){
      return this.discardProductFromCart(object.product.id)
    }
    return this.cartService.changeQuantityOnCart(object.product, token, minus)
  }

  render () {
    if(this.props.cart){
      return (
        <>
          {this.props.cart.map(object => {
            const desc = object.product.description
            return(
              <Row key={`productCheckout-${object.product.id}`}style={{marginBottom: 20}}>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <Card>
                    <Image src={object.product_images[0].front_url} />
                  </Card>
                </Col>
                <Col style={{}} xs={7} sm={7} md={7} lg={7}>
                  <Row style={{ fontSize: '135%',fontWeight: 'bold'}}>{object.product.display_name}</Row>
                  <Row>{ ReactHtmlParser(desc) }</Row>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <Divider style={{color: '#d3d3d3' }} vertical>|</Divider>
                </Col>
                <Col style={{}} xs={2} sm={2} md={2} lg={2}>
                  <Row style={{ fontSize: '135%', fontWeight: 'bold' }}>{object.product.list_price}</Row>
                  <Row style={{}}>
                    <Col style={{textAlign: 'left'}} xs={8} sm={8} md={8} lg={8}>
                      Quantity: {object.quantity}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Icon onClick={() => this.handleDecreasingQuantity(object, this.props.user.token, "minus")} style={{}} name='minus' />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Icon onClick={() => this.cartService.changeQuantityOnCart(object.product, this.props.user.token, 'not minus')} style={{}} name='plus' />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })}
        </>
      )
    } else {
      return(
        <>{/*Loading component*/}</>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cartAndWishlist.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      discardProductFromCart: (newCart) => {
        dispatch({
          type: 'DISCARD_PRODUCT_FROM_CARD',
          newCart: newCart
        })
    }, changeQuantityOnCart: (newProduct) => {
      dispatch({
        type: 'CHANGE_QUANTITY_ON_CART',
        newProduct: newProduct
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderProductsForCheckout);
