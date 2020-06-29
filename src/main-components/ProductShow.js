import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader, Icon, Card, Image, Button } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import CartService from '../services/CartService.js';
import WishlistService from '../services/WishlistService.js';
import CartAndWishlistService from '../services/CartAndWishlistService.js';
import ProductCardComponent from '../sub-components/ProductCardComponent.js';
import ReactImageFallback from "react-image-fallback";



var imageExists = require('image-exists')

const renderCards = (products, comp) => (
      products.map(product => (
      <Col xs={6} sm={6} md={2} lg={2} className='mx-auto' key={`product-${product.id}`} style={{ marginBottom: 23 }}>
        <ProductCardComponent key={product.id} displayName={product.display_name} product={product} imgUrl={product.images[0].front_url} />
      </Col>
    ))
)

class ProductShow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: this.props.product ? this.props.product : {},
      carouselItems: [],
      youMightAlsoLikeProducts: props.youMightAlsoLikeProducts
    }
    this.cartService = new CartService(this);
    this.wishlistService = new WishlistService(this);
    this.cartAndWishlistService = new CartAndWishlistService(this);
  }

  handleCartClick = () => {
    if(this.props.user.token === undefined){
      this.props.openModal(true)
    } else {
      let cartProductIds = []
      this.props.cart ?  cartProductIds = this.props.cart.map(object => object.product.id) : console.log()
      if(cartProductIds.includes(this.props.product.id)){
        this.cartAndWishlistService.discardProductFromCart(this.props.user.token, this.props.product.id)
      } else {
        this.cartService.addProductToCart(this.props.product.id, this.props.user.token)
      }
    }
  }

  handleWishlistClick = () => {
    if(this.props.user.token === undefined){
      this.props.openModal(true)
    } else {
      let wishlistProductIds = []
      this.props.wishlist ?  wishlistProductIds = this.props.wishlist.map(object => object.product.id) : console.log()
      if(wishlistProductIds.includes(this.props.product.id)){
        this.cartAndWishlistService.discardProductFromWishlist(this.props.user.token, this.props.product.id)
      } else {
        this.wishlistService.addProductToWishlist(this.props.product.id, this.props.user.token)
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
        <Container style={{marginTop: 40, marginBottom: 100}}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              {/* Carousel START */}
                <Carousel>
                  {this.props.carouselItems === undefined ? [] : this.props.carouselItems}
                </Carousel>
              {/* Carousel END */}
              <h5 style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10, maxWidth: "750px"}}>
                {product.display_name}
                <Icon name='heart' onClick={() => this.handleWishlistClick()} style={{marginLeft: 4}} color={wishlistProductIds2.includes(product.id) ? 'red' : 'grey'}/>
              </h5>
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
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  { ReactHtmlParser(product.description) }
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} style={{marginBottom: 10}}>
                  <table className="sizechart ws_100 txc b_gray">
                      <tbody><tr style={{backgroundColor: '#000000', color: '#fff'}}>
                          <td colSpan="2" style={{border: '1px solid white'}}>Size</td>
                          <td style={{border: '1px solid white'}}>Bust</td>
                          <td style={{border: '1px solid white'}}>Waist</td>
                          <td style={{border: '1px solid white'}}>Hips</td>
                      </tr>
                      <tr>
                          <td style={{border: '1px solid #ddd'}}>XS</td>
                          <td style={{border: '1px solid #ddd'}}>1</td>
                          <td style={{border: '1px solid #ddd'}}>32</td>
                          <td style={{border: '1px solid #ddd'}}>24-25</td>
                          <td style={{border: '1px solid #ddd'}}>33-34</td>
                      </tr>
                      <tr style={{backgroundColor: '#f3f3f3'}}>
                          <td style={{border: '1px solid #ddd'}}>S</td>
                          <td style={{border: '1px solid #ddd'}}>3/5</td>
                          <td style={{border: '1px solid #ddd'}}>34-35</td>
                          <td style={{border: '1px solid #ddd'}}>26-27</td>
                          <td style={{border: '1px solid #ddd'}}>35-36</td>
                      </tr>
                      <tr>
                          <td style={{border: '1px solid #ddd'}}>M</td>
                          <td style={{border: '1px solid #ddd'}}>7/9</td>
                          <td style={{border: '1px solid #ddd'}}>36-37</td>
                          <td style={{border: '1px solid #ddd'}}>28-29</td>
                          <td style={{border: '1px solid #ddd'}}>38-40</td>
                      </tr>
                      <tr style={{backgroundColor: '#f3f3f3'}}>
                          <td style={{border: '1px solid #ddd'}}>L</td>
                          <td style={{border: '1px solid #ddd'}}>11</td>
                          <td style={{border: '1px solid #ddd'}}>38-39</td>
                          <td style={{border: '1px solid #ddd'}}>30-31</td>
                          <td style={{border: '1px solid #ddd'}}>42-44</td>
                      </tr>
                      <tr>
                          <td style={{border: '1px solid #ddd'}}>XL</td>
                          <td style={{border: '1px solid #ddd'}}>13</td>
                          <td style={{border: '1px solid #ddd'}}>40-41</td>
                          <td style={{border: '1px solid #ddd'}}>32-33</td>
                          <td style={{border: '1px solid #ddd'}}>45-47</td>
                      </tr>
                  </tbody></table>
                <div className="d_content" style={{marginTop: 3}}><p>- Please Indicate Your Size From Cart. Default is Medium(M).</p></div>
                </Col>
              </Row>
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
          <Row className="margin-bt-nav">
            {renderCards(this.state.youMightAlsoLikeProducts, this)}
          </Row>
        </Container>
      )
  }
}

function carouselItemGenerator(product){
  let newItems = []
  for (const productImages in product.images[0]) {
    if (productImages.normalize().includes('url') &&  !productImages.normalize().includes('small')) {
    // imageExists(product.images[0][productImages], (exists) => {
    // <Image style={{borderRadius: "20px", border: '2px solid #e0e1e2'}} src={product.images[0][productImages]} />
        if(true){
            newItems = [...newItems, (<Carousel.Item active={productImages.normalize().includes('front') ? true : false} key={`carouselItem-${product.images[0][productImages]}`}>
                                        <ReactImageFallback
                                          src={product.images[0][productImages]}
                                          fallbackImage="/images/404-image-not-found-f31.jpg"
                                          initialImage="/images/loader.gif"
                                          alt="Loading..."
                                          className="ui image" />
                                      </Carousel.Item>)]
        } else {
          return null;
        }
      // })
    }
  }
  return newItems;
}

function randomProductGenerator(products, productId, product = {}){
  let choosedProducts = []
  let ids = []
  if(product === {}){
    ids = [products.find(product => product.id == productId).id]
  } else {
    ids = [product.id]
  }
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

const request = async (products, id) => {
  const productIds =  await products.map(el => el.id)
  if(!productIds.includes(id)){
    const response = await fetch(`http://localhost:3000/products/${id}`)
    const json = await response.json()
    return json
  } else {
    const json = await products.find(product => product.id === id)
  }
}

const mapStateToProps = (state, ownProps) => {
  // fetching the product from the state for show page
  const productId = ownProps.match.params.id
  let product = state.products.find(product => product.id == productId)
  return {
    user: state.user,
    cart: state.cartAndWishlist.cart,
    wishlist: state.cartAndWishlist.wishlist,
    product: product,
    products: state.products,
    carouselItems: carouselItemGenerator(product),
    youMightAlsoLikeProducts: randomProductGenerator(state.products, productId, product)
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
