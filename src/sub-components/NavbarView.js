import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

class NavbarView extends Component {
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
                <span onClick={() => this.props.openModal(true)}><i className="fa fa-fw fa-heart" style={{ fontSize: '1.2em', marginLeft: 10 }} /> (0)</span>
              </Nav.Item>
              <Nav.Item onClick={() => this.props.openModal(true)} style={{marginLeft: 10, fontWeight: 'bold' }}>
                Sign In or
              </Nav.Item>
              <Nav.Item onClick={() => this.props.openModal(true)} style={{marginLeft: 3, marginRight: 10, fontWeight: 'bold'  }}>
                Sign Up
              </Nav.Item>
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

export default NavbarView;
