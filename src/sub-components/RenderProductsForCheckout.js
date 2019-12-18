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
        <div style={{marginTop: 20}}>
          {this.props.cart.map(object => {
            // Content + CareSize + Fit sub-description was like this before replace() - now => Content + Care Size + Fit
            const desc = object.product.description.replace('font-size: 12px;', "font-size: 12px; margin-left: 10px;")
            return(
              <Row key={`productCheckout-${object.product.id}`}style={{marginBottom: 20}}>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <Card>
                    <Image src={object.product_images[0].front_url} />
                  </Card>
                </Col>
                <Col style={{}} xs={7} sm={7} md={7} lg={7}>
                  <Row style={{ fontSize: '135%',fontWeight: 'bold'}}>{object.product.display_name}</Row>
                  <Divider style={{color: '#d3d3d3' }} />
                  <Row>{ ReactHtmlParser(desc) }</Row>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <Divider style={{color: '#d3d3d3' }} vertical>|</Divider>
                </Col>
                <Col style={{}} xs={12} sm={2} md={2} lg={2}>
                  <Row style={{ fontSize: '135%', fontWeight: 'bold' }}>{object.product.list_price}</Row>
                  <Row style={{marginBottom: 7}}>
                    <Col style={{fontSize: '105%', textAlign: 'left', paddingLeft: 0 }} xs={8} sm={12} md={12} lg={7}>
                      Quantity: {object.quantity}
                    </Col>
                    <Col xs={2} sm={6} md={6} lg={2}>
                      <Icon onClick={() => this.handleDecreasingQuantity(object, this.props.user.token, "minus")} style={{}} name='minus' />
                    </Col>
                    <Col xs={2} sm={6} md={6} lg={2}>
                      <Icon onClick={() => this.cartService.changeQuantityOnCart(object.product, this.props.user.token, 'not minus')} style={{}} name='plus' />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{textAlign: 'left', paddingLeft: 0}} sm={true}>
                      Shipping Fee: {object.product.shipping_fee}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{textAlign: 'left', paddingLeft: 0}} sm={true}>
                      Student Deal: {object.product.student_deal ? 'Yes' : 'No'}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })}
        </div>
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
