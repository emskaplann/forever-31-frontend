import React from 'react';
import WishlistService from '../services/WishlistService.js';
import CartService from '../services/CartService.js';
import posed, { PoseGroup } from 'react-pose';
import { Card, Image, Icon, Label } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Box = posed.div({
  hoverable: true,
  pressable: true,
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }, init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  }, hover: {
    opacity: 1,
    scale: 1.05,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }, press: {
    scale: 1.02,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
});

const DetailsOnBox = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    opacity: 0,
  }, hover: {
    opacity: 0.89,
    scale: 1,
  }, press: {
    scale: 1,
  }
});

class ProductCardComponent extends React.Component {
  constructor () {
    super();
    this.state = {
      isVisible: false
    }
    this.wishlistService = new WishlistService(this)
    this.cartService = new CartService(this)

  }

  componentDidMount(){
    this.setState({isVisible: !this.state.isVisible})
  }

  handleWishlistClick = (product) => {
    const wishlistProductIds = this.props.wishlist.map(object => object.product.id)
    if(wishlistProductIds.includes(product.id)){
      this.cartService.changeQuantityOnWishlist(product, this.props.user.token)
    } else {
      this.cartService.addProductToWishlist(product.id, this.props.user.token)
    }
  }

  handleCartClick = (product) => {
    const cartProductIds = this.props.cart.map(object => object.product.id)
    if(cartProductIds.includes(product.id)){
      this.cartService.changeQuantityOnCart(product, this.props.user.token)
    } else {
      this.cartService.addProductToCart(product.id, this.props.user.token)
    }
  }

  render(){
    const { isVisible } = this.state
      return(
          <PoseGroup>
            {isVisible && (
                <Box key='box' className='box' style={{position: 'relative'}}>
                  <Card>
                    <Image src={this.props.imgUrl} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 4}} wrapped />
                    {/* Product List Price Goes In This Section */}
                    <DetailsOnBox>
                      <Label corner='left' icon='heart' color='black' onClick={() => this.handleWishlistClick(this.props.product)} />
                      <Label corner='right' icon='shopping cart' color='black' onClick={() => this.handleCartClick(this.props.product)} />
                    </DetailsOnBox>
                    <DetailsOnBox style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <Card.Header style={{borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: '#000000'}}>
                          <Row>
                            <Col style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
                              $12.99
                            </Col>
                          </Row>
                        </Card.Header>
                    </DetailsOnBox>
                  </Card>
                </Box>
            )}
          </PoseGroup>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user,
      cart: state.cartAndWishlist.cart,
      wishlist: state.cartAndWishlist.wishlist
    }
  }

  const mapDispatchToProps = (dispatch, mergeProps) => {
      return {
        addProductToWishlist: (newProduct) => {
          dispatch({
            type: 'ADD_PRODUCT_TO_WISHLIST',
            newProduct: newProduct
          })
      }, addProductToCart: (newProduct) => {
        dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          newProduct: newProduct
        })
      }, changeQuantityOnCart: (newProduct) => {
        dispatch({
          type: 'CHANGE_QUANTITY_ON_CART',
          newProduct: newProduct
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardComponent);
