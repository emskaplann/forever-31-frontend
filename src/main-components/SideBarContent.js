import React from 'react';
import RenderSign from '../sub-components/sidebar/RenderSign.js';
import RenderProduct from '../sub-components/sidebar/RenderProduct.js';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input, Divider } from 'semantic-ui-react';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cartAndWishlist.cart,
    wishlist: state.cartAndWishlist.wishlist
  }
}

class SideBarContent extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

// render cart for logged in user
  renderCart = () => {
    const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.product.list_price.replace('$', ''));
    if(this.props.cart){
      return(
        <Container>
            <Divider style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}} horizontal>My F31 Cart</Divider>
            <Row>
              <Col>
                <Header as='h4' style={{color: '#fff'}}>Total: ${this.props.cart.reduce(reducer, 0)}</Header>
              </Col>
              <Col>
                <Header as='h4' style={{color: '#fff'}}>Item Count: 5</Header>
              </Col>
            </Row>
            <br />
            {this.props.cart.map(object => <RenderProduct key={object.product.id} product={object.product} productImages={object.product_images[0]} />)}
        </Container>
      )
    }
  }

// this function renders sidebar content based on given props
  renderContent = () => {
    console.log(this.props.contentId)
    if (this.props.contentId === 0 ) {
      return( <RenderSign closeSideBar={this.props.closeSideBar}/> )
    } else if (this.props.contentId === 1 && this.props.user.token) {
      return( this.renderCart() )
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
