import React from 'react';
import CartAndWishlistService from '../../services/CartAndWishlistService.js';
import CartService from '../../services/CartService.js';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react';

class RenderProduct extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.wishlistService = new CartService(this)
  }


  discardProductFromWishlist = (productId) => this.cartAndWishlistService.discardProductFromWishlist(this.props.user.token, productId)

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
            </Col>
            <Col xs={1} sm={1} md={1}>
              <Icon onClick={() => this.discardProductFromWishlist(product.id)} style={{color: '#fff'}} name='close' />
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
    wishlist: state.cartAndWishlist.wishlist
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      discardProductFromWishlist: (newWishlist) => {
        dispatch({
          type: 'DISCARD_PRODUCT_FROM_WISHLIST',
          newWishlist: newWishlist
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderProduct);
