import React from 'react';
import WishlistService from '../services/WishlistService.js';
import CartService from '../services/CartService.js';
import posed, { PoseGroup } from 'react-pose';
import { Card, Image, Icon } from 'semantic-ui-react';
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
    opacity: 0.95,
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
    opacity: 0.86,
    scale: 1,
  }, press: {
    scale: 1.05,
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

  handleWishlistClick = (id) => this.wishlistService.addProductToWishlist(id, this.props.user.token)
  handleCartClick = (id) => this.cartService.addProductToCart(id, this.props.user.token)


  render(){
    const { isVisible } = this.state
      return(
          <PoseGroup>
            {isVisible && (
                <Box key='box' className='box' style={{position: 'relative'}}>
                  <Card>
                    <Image src={this.props.imgUrl} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 4}} wrapped />
                    {/* Product List Price Goes In This Section */}
                    <DetailsOnBox style={{position: 'absolute', width: '100%'}}>
                          <Card.Header style={{borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#000000'}}>
                            <Row>
                              <Col style={{color: '#fff', textAlign: 'center'}}>
                                $12.99
                              </Col>
                            </Row>
                          </Card.Header>
                      </DetailsOnBox>
                      {/* Product Title Goes In This Section */}
                      <DetailsOnBox style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <Card.Header style={{borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: '#000000'}}>
                          <Row>
                            <Col onClick={() => this.handleWishlistClick(this.props.product.id)} style={{color: '#fff', textAlign: 'center', width: '50%', fontSize: 12}}>
                              <Icon style={{fontSize: '1.1em'}} name='heart'/>
                            </Col>
                            <Col onClick={() => this.handleCartClick(this.props.product.id)} style={{color: '#fff', textAlign: 'center', width: '50%', fontSize: 12, borderLeft: '1px solid gray'}}>
                              <Icon style={{fontSize: '1.1em'}} name='shopping cart'/>
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
      user: state.user
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
    }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardComponent);
