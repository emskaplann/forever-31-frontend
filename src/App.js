import React from 'react';
import Checkout from './main-components/Checkout.js';
import ProductIndex from './main-components/ProductIndex.js';
import ProductShow from './main-components/ProductShow.js';
import SideBarContent from './main-components/SideBarContent.js';
import NavbarView from './sub-components/NavbarView.js';
import BottomNavbar from './sub-components/BottomNavbar.js';
import RedirectToHome from './sub-components/RedirectToHome.js';
import CartAndWishlistService from './services/CartAndWishlistService.js';
import WatsonService from './services/WatsonService.js';
import { Route, Switch } from 'react-router-dom';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { connect } from 'react-redux';
import { Ripple } from 'react-spinners-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-widget/lib/styles.css';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    user: state.user
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      visible: false,
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      contentId: 0,
      isWidgetOpen: false,
      isLoaded: false,
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.watsonService = new WatsonService(this)
    this.addResponseMessage = addResponseMessage
  }

  componentDidMount () {
    this.addResponseMessage('Hi there! From F31 Store!')
    if(localStorage.userId && localStorage.isF31 == "true") { //eslint-disable-line
      this.props.addUserAuth({token: localStorage.token, userId: localStorage.userId, address: {line_1: localStorage.addressLineOne, line_2: localStorage.addressLineTwo}})
      this.cartAndWishlistService.fetchCartAndWishlist(localStorage.token)
    }
    setInterval(this.watsonService.createWatsonSession, 50000)
  }

  getContentId = (contentId) => {
    if(this.props.user.token !== undefined){
      return this.setState({contentId: contentId})
    }
    return this.setState({contentId: 0})
  }

  setVisible = bool => this.setState({visible: bool}, function(){
    bool ? console.log() : this.setState({contentId: ""})
  })

  handleNewUserMessage = newMessage => {
    this.watsonService.sendNewUserMessage(newMessage)
  }

  setLoader = () => this.setState({isLoaded: true})

  loader() {
    if(this.props.products.length !== 0) {
      setTimeout(this.setLoader, 500)
    }
  }

  render(){
    this.loader()
    let sideBarWidth = 400
    const { visible } = this.state
    if(Math.max(document.documentElement.clientWidth, window.innerWidth) < 400){
      sideBarWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
    if(this.state.isLoaded) {
      return (
        <>
        <Route
          render={({ location }) => (
            <Sidebar.Pushable as={Segment}>
              {/* sidebar animation is editable */}
              <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                icon='labeled'
                inverted
                onHide={() => this.setVisible(false)}
                vertical
                visible={visible}
                style={{width: sideBarWidth}}
              >
              {/* Sidebar Content */}
                <SideBarContent contentId={this.state.contentId} closeSideBar={this.setVisible}/>
              </Sidebar>
              <Sidebar.Pusher dimmed={visible}>
                <NavbarView sendContentId={this.getContentId} openModal={this.setVisible} />
                  <Segment style={{backgroundColor: '#fcfeff'}} basic>
                        <Switch location={location}>
                          <Route exact path='/' component={ProductIndex} key='index' />
                          <Route exact path='/products/:id' render={(props) => <ProductShow {...props} openModal={this.setVisible} />} key='show' />
                          {/* Stripe Route */}
                          <StripeProvider apiKey="pk_test_YJZiIQadCitjxkefrqHysj0g00BNRtnusD">
                            <Elements>
                              <Route exact path='/checkout' component={Checkout} key='checkout' />
                              {/* <Route path="*" component={RedirectToHome} key='redirect' /> */}
                            </Elements>
                          </StripeProvider>
                        </Switch>
                  </Segment>
                  <BottomNavbar />
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          )}
        />
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          subtitle={"You can ask anything you want!"}
          />
      </>
      );
    } else {
      return(
        <div style={{
          width: "300px",
	        height: "150px",
          margin: "auto",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center"
        }}>
          <span style={{fontFamily: 'Indie Flower', fontWeight: 'bold', fontSize: 20}}>Forever 31</span><br />
          <Ripple color={"#000000"} />
          <br />
          <span><u>The server I'm using for this project is down because of exceeding the free hours I had. The server will be up again on <b>1st October.</b></u></span><br /><br />
          <a href="https://emskaplann.github.io/#/">You can go back to my portfolio site to view my other projects. Please click here to do so.</a><br /><br />
          <span>Because of using free services this loading may take up to <strong>20 seconds.</strong> Thanks for your patience.</span>
        </div>
      );
      //render loader
    }
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      addUserAuth: (user) => {
        dispatch({
          type: 'ADD_USER_AUTH',
          user: user
        })
    }, addCartAndWishlist: (cartAndWishlist) => {
      dispatch({
        type: 'ADD_CART_AND_WISHLIST',
        cartAndWishlist: cartAndWishlist
      })
    }, addWatsonSession: (sessionId) => {
      dispatch({
        type: 'ADD_WATSON_SESSION',
        sessionId: sessionId
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
