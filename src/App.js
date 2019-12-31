import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './main-components/Checkout.js';
import ProductIndex from './main-components/ProductIndex.js';
import ProductShow from './main-components/ProductShow.js';
import CartAndWishlistService from './services/CartAndWishlistService.js';
import SideBarContent from './main-components/SideBarContent.js';
import NavbarView from './sub-components/NavbarView.js';
import { Route, Link, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Widget, addResponseMessage } from 'react-chat-widget';
import WatsonService from './services/WatsonService.js';
import { connect } from 'react-redux';

import 'react-chat-widget/lib/styles.css';


const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    user: state.user
  }
}

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 500, beforeChildren: true },
  exit: { opacity: 1 }
});

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      visible: false,
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      contentId: 0,
      isWidgetOpen: false
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
    this.watsonService = new WatsonService(this)
    this.addResponseMessage = addResponseMessage
  }

  componentDidMount () {
    this.addResponseMessage('Hi there! From F31 Store!')
    if(localStorage.userId){
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
    bool ? console.log('s') : this.setState({contentId: ""})
  })

  handleNewUserMessage = newMessage => {
    this.watsonService.sendNewUserMessage(newMessage)
  }

  handleWidget = () => {
    this.setState({isWidgetOpen: !this.state.isWidgetOpen}, () => {
      if(this.state.isWidgetOpen){
        if(localStorage.watsonSessionId){
          this.props.addWatsonSession(localStorage.watsonSessionId)
        } else {
          this.watsonService.createWatsonSession()
        }
      } else {
        localStorage.watsonSessionId = ""
      }
    })
  }

  render(){
    let sideBarWidth = 400
    const { visible } = this.state
    if(Math.max(document.documentElement.clientWidth, window.innerWidth) < 400){
      sideBarWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
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
                        <Route exact path='/products/:id' component={ProductShow} key='show' />
                        {/* Stripe Route */}
                        <StripeProvider apiKey="pk_test_YJZiIQadCitjxkefrqHysj0g00BNRtnusD">
                          <Elements>
                            <Route path='/checkout' component={Checkout} key='checkout' />
                          </Elements>
                        </StripeProvider>
                      </Switch>
                </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        )}
      />
      <div onClick={() => this.handleWidget()}>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
           />
       </div>
    </>
    );
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

  // {renderCards(props.products.flat())} => products render .flat()

  // Old Sidebar Content
    // <Menu.Item>
    //   <Icon name='home' />
    //   <Link to='/checkout'>Checkout!</Link>
    // </Menu.Item>
    // <Menu.Item as='a'>
    //   <Icon name='gamepad' />
    //   Games
    // </Menu.Item>
    // <Menu.Item as='a'>
    //   <Icon name='camera' />
    //   Channels
    // </Menu.Item>
