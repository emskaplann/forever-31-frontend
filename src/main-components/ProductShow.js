import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader, Icon, Card, Image, Button } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import CartService from '../services/CartService.js';
import WishlistService from '../services/WishlistService.js';
import CartAndWishlistService from '../services/CartAndWishlistService.js';
import ProductCardComponent from '../sub-components/ProductCardComponent.js';


var imageExists = require('image-exists')

const renderCards = (products, comp) => (
      products.map(product => (
      <Col xs={6} sm={6} md={2} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 23 }}>
        <ProductCardComponent key={product.id} changeCarousel={comp.changeCarousel} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
      </Col>
    ))
)

class ProductShow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      carouselItems: [],
      youMightAlsoLikeProducts: props.youMightAlsoLikeProducts
    }
    this.cartService = new CartService(this);
    this.wishlistService = new WishlistService(this);
    this.cartAndWishlistService = new CartAndWishlistService(this);
  }

  changeCarousel = () => {
    this.setState({carouselItems: [], youMightAlsoLikeProducts: randomProductGenerator(this.props.products, this.props.product.id)}, () => {for (const productImages in this.props.product.images[0]) {
      if (productImages.normalize().includes('url') &&  !productImages.normalize().includes('small')) {
        imageExists(this.props.product.images[0][productImages], (exists) => {
          if(exists){
              this.setState({carouselItems: [...this.state.carouselItems, (<Carousel.Item key={`carouselItem-${this.props.product.images[0][productImages]}`}>
                <Image style={{borderRadius: "20px", border: '2px solid #e0e1e2'}} src={this.props.product.images[0][productImages]} />
              </Carousel.Item>)]})
          }
        })
      }
    }})
  }
  handleCartClick = () => {
    let cartProductIds = []
    this.props.cart ?  cartProductIds = this.props.cart.map(object => object.product.id) : console.log()
    if(cartProductIds.includes(this.props.product.id)){
      this.cartAndWishlistService.discardProductFromCart(this.props.user.token, this.props.product.id)
    } else {
      this.cartService.addProductToCart(this.props.product.id, this.props.user.token)
    }
  }

  handleWishlistClick = () => {
    let wishlistProductIds = []
    this.props.wishlist ?  wishlistProductIds = this.props.wishlist.map(object => object.product.id) : console.log()
    if(wishlistProductIds.includes(this.props.product.id)){
      this.cartAndWishlistService.discardProductFromWishlist(this.props.user.token, this.props.product.id)
    } else {
      this.wishlistService.addProductToWishlist(this.props.product.id, this.props.user.token)
    }
  }

  componentDidMount () {
    for (const productImages in this.props.product.images[0]) {
      if (productImages.normalize().includes('url') &&  !productImages.normalize().includes('small')) {
        imageExists(this.props.product.images[0][productImages], (exists) => {
          if(exists){
              this.setState({carouselItems: [...this.state.carouselItems, (<Carousel.Item key={`carouselItem-${this.props.product.images[0][productImages]}`}>
                <Image style={{borderRadius: "20px", border: '2px solid #e0e1e2'}} src={this.props.product.images[0][productImages]} />
              </Carousel.Item>)]})
          }
        })
      }
    }
  }

  render () {
    let cartProductIds = []
    let wishlistProductIds2 = []
    this.props.wishlist ?  wishlistProductIds2 = this.props.wishlist.map(object => object.product.id) : console.log()
    this.props.cart ?  cartProductIds = this.props.cart.map(object => object.product.id) : console.log()
    const product = this.props.product
      return(
        <Container style={{marginTop: 40, marginBottom: 10}}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              {/* Carousel START */}
                <Carousel>
                  {this.state.carouselItems}
                </Carousel>
              {/* Carousel END */}
              <h4 style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10}}>
                {product.display_name}
                <Icon name='heart' onClick={() => this.handleWishlistClick()} style={{marginLeft: 4}} color={wishlistProductIds2.includes(product.id) ? 'red' : 'grey'}/>
              </h4>
              <Divider />
              <Row style={{justifyContent: 'space-between'}}>
                <Col style={{marginTop: 7}} xs={2} sm={2} md={2} lg={2}>
                  <h6 style={{fontWeight: 'bold'}}>{product.list_price}</h6>
                </Col>
                <Col style={{textAlign: 'center', }} xs={10} sm={10} md={10} lg={10}>
                  <Button fluid size='tiny' onClick={() => this.handleCartClick()}>
                     <Icon style={{fontSize: '1.1em'}} name='shopping cart'/>{cartProductIds.includes(product.id) ?  'Already On Cart' : 'Add To Cart'}
                   </Button>
                </Col>
              </Row>
            </Col>
            <Col style={{marginTop: 5}} xs={12} sm={12} md={6} lg={6}>
              { ReactHtmlParser(product.description) }
            </Col>
            <Col xs={12} sm={3} md={2} lg={2}>
              <Row>
                <Col style={{textAlign: 'left', paddingLeft: 0}} xs={6} sm={12} md={4} lg={12}>
                  Shipping Fee: {product.shipping_fee}
                </Col>
                <Col style={{textAlign: 'left', paddingLeft: 0}} xs={6} sm={6} md={12} lg={12}>
                  Student Deal: {product.student_deal ? 'Yes' : 'No'}
                </Col>
              </Row>
            </Col>
          </Row>
            <Divider horizontal>You Might Also Like</Divider>
          <Row>
            {renderCards(this.state.youMightAlsoLikeProducts, this)}
          </Row>
        </Container>
      )
  }
}

function randomProductGenerator(products, productId){
  let choosedProducts = []
  let ids = [products.find(product => product.id == productId).id]
  for(let i = 0; i < 6; i++){
    let rand = Math.floor(Math.random() * Math.floor(products.length))
    if(ids.includes(products[rand].id)){
      i -= 1
    } else {
      ids.push(products[rand].id)
      choosedProducts.push(products[rand])
    }

    // products2.splice(rand, 1)
  }
  return choosedProducts;
}

const mapStateToProps = (state, ownProps) => {
  // fetching the product from the state for show page
  const productId = ownProps.match.params.id
  return {
    user: state.user,
    cart: state.cartAndWishlist.cart,
    wishlist: state.cartAndWishlist.wishlist,
    product: state.products.find(product => product.id == productId),
    products: state.products,
    youMightAlsoLikeProducts: randomProductGenerator(state.products, productId)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
