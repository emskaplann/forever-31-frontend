import React from 'react';
import CartAndWishlistService from '../../services/CartAndWishlistService.js';
import CartService from '../../services/CartService.js';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input } from 'semantic-ui-react';

class RenderProduct extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      quantity: props.cart.find(object => object.product.id == props.product.id).quantity
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.cartService = new CartService(this)
  }


  discardProductFromCart = (productId) => this.cartAndWishlistService.discardProductFromCart(this.props.user.token, productId)

  handleDecreasingQuantity = (product, token, minus) => {
    if(this.state.quantity === 1){
      return this.discardProductFromCard(product.id)
    }
    return this.cartService.changeQuantityOnCart(product, token, minus)
  }

  render () {
    const product = this.props.product
    return (
        <>
          <Row>
            <Col xs={3} sm={3} md={3}>
              <Card style={{width: '70px', height: '105px', marginRight: 5}} fluid image={this.props.productImages.front_url}/>
            </Col>
            <Col xs={7} sm={7} md={8} className='mx-auto'>
              <Row>
                <Col sm={12} lg={12}>
                  <span style={{color: '#fff'}}>{product.display_name}</span>
                </Col>
                <Col sm={6} lg={6}>
                  {product.on_sale ? (<><Icon style={{color: '#fff'}} size='small' name='tag' /><span style={{color: '#fff'}}>On Sale!</span></>) : null}
                </Col>
                <Col sm={6} lg={6}>
                  <p style={{color: '#fff'}}>{product.list_price}</p>
                </Col>
              </Row>
              <Row>
                <Col sm={12} lg={12} style={{color: '#fff', fontSize: 15}}>
                  quantity: {this.state.quantity}
                </Col>
              </Row>
            </Col>
            <Col xs={1} sm={1} md={1}>
              <Row style={{height: '36%'}}>
                <Icon onClick={() => this.discardProductFromCart(product.id)} style={{color: '#fff'}} name='close' />
              </Row>
              <Row style={{height: '20%'}}>
                <Icon onClick={() => this.cartService.changeQuantityOnCart(product, this.props.user.token, 'not minus')} style={{color: '#fff'}} name='plus' />
              </Row>
              <Row style={{height: '20%'}}>
                <Icon onClick={() => this.handleDecreasingQuantity(product, this.props.user.token, "minus")} style={{color: '#fff'}} name='minus' />
              </Row>
            </Col>
          </Row>
        <br />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    cart: state.cartAndWishlist.cart
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

export default connect(mapStateToProps, mapDispatchToProps)(RenderProduct);
