import React from 'react';
import RenderSign from '../sub-components/sidebar/RenderSign.js';
import RenderProduct from '../sub-components/sidebar/RenderProduct.js';
import RenderProductForWishlist from '../sub-components/sidebar/RenderProductForWishlist.js';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap';
import { Icon, Divider } from 'semantic-ui-react';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cartAndWishlist.cart,
    wishlist: state.cartAndWishlist.wishlist
  }
}

// reducers for cart's total and item count
const reducer = (accumulator, currentValue) => accumulator + (parseInt(currentValue.quantity) * parseInt(currentValue.product.list_price.replace('$', '')));
const reducer2 = (accumulator, currentValue) => accumulator + (currentValue.quantity)
// reducer for wishlist's total
const reducer3 = (accumulator, currentValue) => accumulator + parseInt(currentValue.product.list_price.replace('$', ''));

class SideBarContent extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

// render cart for logged in user
  renderCart = () => {
    if(this.props.cart){
      return(
        <Container>
            <Divider style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}} horizontal>My F31 Cart</Divider>
            <Row>
              <Col>
                <Header as='h4' style={{color: '#fff'}}>Total: ${this.props.cart.reduce(reducer, 0)}</Header>
              </Col>
              <Col>
                <Header as='h4' style={{color: '#fff'}}>Item Count: {this.props.cart.reduce(reducer2, 0)}</Header>
              </Col>
            </Row>
            <br />
            {this.props.cart.map(object => <RenderProduct key={object.product.id} product={object.product} productImages={object.product_images[0]} />)}
        </Container>
      )
    }
  }

// render wishlist for logged in user
  renderWishlist = () => {
    if(this.props.wishlist){
      return(
        <Container>
          <Divider style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}} horizontal>My F31 wishlist</Divider>
          <Row>
            <Col>
              <Header as='h4' style={{color: '#fff'}}>Total: ${this.props.wishlist.reduce(reducer3, 0)}</Header>
            </Col>
            <Col>
              <Header as='h4' style={{color: '#fff'}}>Item Count: {this.props.wishlist.length}</Header>
            </Col>
          </Row>
          <br />
          {this.props.wishlist.map(object => <RenderProductForWishlist key={object.product.id} product={object.product} productImages={object.product_images[0]} />)}
        </Container>
      )
    }
  }

// this function renders sidebar content based on given props
  renderContent = () => {
    if (this.props.contentId === 0 ) {
      return( <RenderSign closeSideBar={this.props.closeSideBar}/> )
    } else if (this.props.contentId === 1 && this.props.user.token) {
      return( this.renderCart() )
    } else if (this.props.contentId === 2 && this.props.user.token) {
      return( this.renderWishlist() )
    }
  }

  render () {
    return(
      <Container>
        <Icon name='close' size='large' onClick={() => this.props.closeSideBar(false)} style={{color: '#fff', marginTop: 5}}></Icon>
        {this.renderContent()}
        {/* this.renderProducts() */}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(SideBarContent);
