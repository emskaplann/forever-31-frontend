import React, { Component } from 'react';
import { Icon, Label, Search, Header, Divider } from 'semantic-ui-react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import NavbarLinks from "./NavbarLinks.js";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    products: state.products.map(el => {
      return {...el, link_id: el.id}
    }),
    cart: state.cartAndWishlist.cart,
    wishlist: state.cartAndWishlist.wishlist
  }
}

const resultRenderer = ({ display_name, link_id, list_price }) => <Link to={`/products/${link_id}`}> <Header as='h5' content={display_name} /> </Link>
resultRenderer.propTypes = {
  display_name: PropTypes.string,
  id: PropTypes.string,
}

class NavbarView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
    }
  }

  logOut = () => {
    this.props.clearUserAuth()
    this.props.clearCartAndWishlist()
    localStorage.token = ""
    localStorage.userId = ""
    localStorage.addressLineOne = ""
    localStorage.addressLineTwo = ""
    localStorage.watsonSessionId = ""
    localStorage.limit = ""
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
        <Nav.Item onClick={() => this.handleModal(0)} style={{marginLeft: 10, fontWeight: 'bold' }}>
          Sign In or
        </Nav.Item>
        <Nav.Item onClick={() => this.handleModal(0)} style={{marginLeft: 3, marginRight: 10, fontWeight: 'bold'  }}>
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

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.display_name)
      this.setState({
          isLoading: false,
          results: _.filter(this.props.products, isMatch).slice(0,5),
      })
    }, 300)
  }

  render() {
    return (
      <>
      <h3>Hello</h3>
      <Navbar className='w-100' expand="lg" fixed="top" bg="light">
        <Navbar.Brand href="/forever-31-frontend" className='mx-auto' style={{fontFamily: 'Indie Flower', fontWeight: 'bold', fontSize: 20}}>Forever 31</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* Cart and WishList icons for opening right directioned sidebar to see Cart or WishList */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='mx-auto'>
            <Row className='mx-auto'>
                <Search
                  size="mini"
                  loading={this.state.isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={this.state.results}
                  value={this.state.value}
                  resultRenderer={resultRenderer}
                  {...this.props}
                />
            </Row>
          </Nav>
          <br />
          <Nav>
            <Row className='mx-auto'>
              <Nav.Item>
                <span style={{ marginLeft: 5 }} onClick={() => this.handleModal(1)}><Icon style={{fontSize: '1.1em'}} name='shopping cart'/>{this.props.cart ? `(${this.props.cart.length})` : '(0)'}</span>
              </Nav.Item>
              <Nav.Item>
                <span style={{ marginLeft: 8, marginRight: 5 }} onClick={() => this.handleModal(2)}><Icon style={{fontSize: '1.1em'}} name='heart'/>{this.props.wishlist ? `(${this.props.wishlist.length})` : '(0)'}</span>
              </Nav.Item>
              {this.renderSigns()}
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" fixed='bottom'>
          <NavbarLinks style={{marginTop: 200}} />
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
