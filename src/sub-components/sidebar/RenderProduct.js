import React from 'react';
import CartAndWishlistService from '../../services/CartAndWishlistService.js';
import CartService from '../../services/CartService.js';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, Icon, Button } from 'semantic-ui-react';

class RenderProduct extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.cartService = new CartService(this)
  }


  discardProductFromCart = (productId) => this.cartAndWishlistService.discardProductFromCart(this.props.user.token, productId)

  handleDecreasingQuantity = (product, token, minus) => {
    if(this.props.quantity === 1){
      return this.discardProductFromCart(product.id)
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
                <Col xs={12} md={12} sm={12} lg={12}>
                  <span style={{color: '#fff'}}>{product.display_name}</span>
                </Col>
                <Col style={{fontSize: '90%', textAlign: 'left'}} xs={6} md={6} sm={6} lg={6}>
                  {product.on_sale ? (<><Icon style={{color: '#fff'}} size='small' name='tag' /><span style={{color: '#fff'}}>On Sale!</span></>) : null}
                </Col>
                <Col style={{fontSize: '90%', textAlign: 'right'}} xs={6} md={6} sm={6} lg={6}>
                  <p style={{color: '#fff'}}>{product.list_price}</p>
                </Col>
              </Row>
              <Row style={{marginTop: 5}}>
                <Col style={{border: '1px solid red'}} xs={6} sm={6} md={6} lg={6}>
                  <Row>
                    <Col id="stupid-button" xs={4} sm={4} md={4} lg={4}>
                      <Button size='mini' active={this.props.size === 'S' ? true : false} style={{fontWeigt: 'bold', padding: '10px'}} inverted onClick={() => this.cartService.changeSizeForProduct(this.props.product, this.props.user.token, "S")}>S</Button>
                    </Col>
                    <Col id="stupid-button" xs={4} sm={4} md={4} lg={4}>
                      <Button size='mini' active={this.props.size === 'M' ? true : false} style={{fontWeigt: 'bold', padding: '10px'}} inverted onClick={() => this.cartService.changeSizeForProduct(this.props.product, this.props.user.token, "M")}>M</Button>
                    </Col>
                    <Col id="stupid-button" xs={4} sm={4} md={4} lg={4}>
                      <Button size='mini' active={this.props.size === 'L' ? true : false} style={{fontWeigt: 'bold', marginLeft: 5, padding: '10px'}} inverted onClick={() => this.cartService.changeSizeForProduct(this.props.product, this.props.user.token, "L")}>L</Button>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} style={{color: '#fff'}}>
                  quantity: {this.props.quantity}
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
    }, changeSizeForProduct: (newProduct) => {
      dispatch({
        type: 'CHANGE_SIZE_FOR_PRODUCT',
        newProduct: newProduct
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderProduct);
