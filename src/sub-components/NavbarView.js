import React, { Component } from 'react';
import { Grid, Menu, Icon } from 'semantic-ui-react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

class NavbarView extends Component {

  logOut = () => {
    this.props.clearUserAuth()
    this.props.clearCartAndWishlist()
    localStorage.token = ""
    localStorage.userId = ""
  }

  renderSigns = () => {
    if(this.props.user.token){
      return (
        <Nav.Item onClick={() => this.logOut()} style={{marginLeft: 10, marginRight: 10, fontWeight: 'bold' }}>
          Log Out
        </Nav.Item>
      )
    } else {
      return (
        <>
        <Nav.Item onClick={() => this.props.openModal(true)} style={{marginLeft: 10, fontWeight: 'bold' }}>
          Sign In or
        </Nav.Item>
        <Nav.Item onClick={() => this.props.openModal(true)} style={{marginLeft: 3, marginRight: 10, fontWeight: 'bold'  }}>
          Sign Up
        </Nav.Item>
        </>
      )
    }
  }

  handleModal = (contentId) => {
    this.props.sendContentId(contentId)
    this.props.openModal(true)
  }

  render() {
    return (
      <>
      <Navbar className='w-100' expand="lg" fixed="top" bg="light">
        <Navbar.Brand href="/" className='mx-auto' style={{fontFamily: 'Indie Flower', fontWeight: 'bold', fontSize: 20}}>Forever 31</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* Cart and WishList icons for opening right directioned sidebar to see Cart or WishList */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='mr-auto'>
          </Nav>
          <Nav className='justify-content-center'>
            <Row>
              <Nav.Item>
                <span style={{ marginLeft: 5 }} onClick={() => this.handleModal(1)}><Icon style={{fontSize: '1.1em'}} name='shopping cart'/> (0)</span>
              </Nav.Item>
              <Nav.Item>
                <span style={{ marginLeft: 8, marginRight: 5 }} onClick={() => this.handleModal(2)}><Icon style={{fontSize: '1.1em'}} name='heart'/>(0)</span>
              </Nav.Item>
              {this.renderSigns()}
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" fixed='bottom'>
      </Navbar>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      clearUserAuth: () => {
        dispatch({
          type: 'CLEAR_USER_AUTH'
        })
    }, clearCartAndWishlist: () => {
      dispatch({
        type: 'CLEAN_CART_AND_WISHLIST'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
