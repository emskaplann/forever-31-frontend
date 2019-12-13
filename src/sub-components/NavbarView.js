import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
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
                <span onClick={() => this.props.openModal(true)}><i className="fa fa-fw fa-shopping-cart" style={{ fontSize: '1.5em' }} /> (0)</span>
              </Nav.Item>
              <Nav.Item>
                <span style={{ marginRight: 5 }} onClick={() => this.props.openModal(true)}><i className="fa fa-fw fa-heart" style={{ fontSize: '1.2em', marginLeft: 10 }} /> (0)</span>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
