import React from 'react';
import CartAndWishlistService from '../services/CartAndWishlistService.js';
import WishlistService from '../services/WishlistService.js';
import CartService from '../services/CartService.js';
import posed, { PoseGroup } from 'react-pose';
import ReactImageFallback from "react-image-fallback";
import Alert from './Alert.js'
import { Link } from 'react-router-dom';
import { Card, Image, Icon, Label } from 'semantic-ui-react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Box = posed.div({
  hoverable: true,
  pressable: true,
   init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  }, hover: {
    opacity: 1,
    scale: 1.02,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }, press: {
    scale: 1,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
});

let cartProductIds2 = []
let wishlistProductIds2 = []

const DetailsOnBox = posed.div({
  init: {
    scale: 1,
    opacity: 0,
  }, hover: {
    opacity: 0.89,
    scale: 1,
  }
});

class ProductCardComponent extends React.Component {
  constructor () {
    super();
    this.state = {
      isVisible: false,
      added: {visible: false, type: 'cart', action: 'added', needToLogin: false},
      timer: 2
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.wishlistService = new WishlistService(this)
    this.cartService = new CartService(this)

  }

  componentDidMount(){
    this.setState({isVisible: !this.state.isVisible})
  }

  handleWishlistClick = (product) => {
    let wishlistProductIds = []
    if(this.props.wishlist){
      wishlistProductIds = this.props.wishlist.map(object => object.product.id)
      if(wishlistProductIds.includes(product.id)){
        this.cartAndWishlistService.discardProductFromWishlist(this.props.user.token, product.id)
      } else {
        this.wishlistService.addProductToWishlist(product.id, this.props.user.token)
      }
    } else {
      this.wishlistService.needToLogin()
    }
  }

  handleCartClick = (product) => {
    let cartProductIds = []
    if(this.props.cart){
      cartProductIds = this.props.cart.map(object => object.product.id)
      if(cartProductIds.includes(product.id)){
        // discard the product from cart
        this.cartAndWishlistService.discardProductFromCart(this.props.user.token, product.id)
      } else {
        // add product to cart
        this.cartService.addProductToCart(product.id, this.props.user.token)
      }
    } else {
      this.cartService.needToLogin()
    }
  }

  changeNeedToLogin = () => this.setState({added: {...this.state.added, needToLogin: false}})
  closeAlert = () => this.setState({added: {...this.state.added, visible: false}})

  render(){
    this.props.cart !== [] && this.props.cart ? cartProductIds2 = this.props.cart.map(object => object.product.id) : cartProductIds2 = []
    this.props.wishlist !== [] && this.props.wishlist ? wishlistProductIds2 = this.props.wishlist.map(object => object.product.id) : wishlistProductIds2 = []
    const { isVisible } = this.state
      return(
          <PoseGroup>
            {isVisible && (
                <Box key='box' className='box' style={{position: 'relative'}}>
                  <Card>
                    <Link to={`/products/${this.props.product.id}`} >
                      {/*<Image src={this.props.imgUrl} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 4}} wrapped />*/}
                        <ReactImageFallback
                          src={this.props.imgUrl}
                          style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 4}} 
                          fallbackImage="/images/404-image-not-found-f31.jpg"
                          initialImage="/images/loader.gif"
                          alt="Loading..."
                          className="ui image" />
                    </Link>
                    {/* Product List Price Goes In This Section */}
                    <DetailsOnBox style={{position: 'absolute', top: '50%', width: '100%'}}>
                      { this.state.added.visible ? <Alert added={this.state.added} changeNeedToLogin={this.changeNeedToLogin} closeAlert={this.closeAlert}/> : null}
                    </DetailsOnBox>
                    <DetailsOnBox>
                      <Label corner='left' color='black' onClick={() => this.handleWishlistClick(this.props.product)}>
                        <Icon name='heart' color={wishlistProductIds2.includes(this.props.product.id) ? 'red' : null}/>
                      </Label>
                    </DetailsOnBox>
                    <DetailsOnBox>
                      <Label corner='right' color='black' onClick={() => this.handleCartClick(this.props.product)}>
                        <Icon name='shopping cart' color={cartProductIds2.includes(this.props.product.id) ? 'yellow' : null}/>
                      </Label>
                    </DetailsOnBox>
                    <DetailsOnBox style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <Card.Header style={{borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: '#000000'}}>
                          <Row>
                            <Col style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
                              {this.props.product.list_price}
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
      }, discardProductFromCart: (newCart) => {
        dispatch({
          type: 'DISCARD_PRODUCT_FROM_CARD',
          newCart: newCart
        })
      }, discardProductFromWishlist: (newWishlist) => {
        dispatch({
          type: 'DISCARD_PRODUCT_FROM_WISHLIST',
          newWishlist: newWishlist
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardComponent);
