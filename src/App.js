import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './main-components/Checkout.js';
import ProductIndex from './main-components/ProductIndex.js';
import ProductShow from './main-components/ProductShow.js';
import SideBarContent from './main-components/SideBarContent.js';
import NavbarView from './sub-components/NavbarView.js';
import { Route, Link, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

class App extends React.Component {
  state = {
    visible: true
  }
  setVisible = bool => this.setState({visible: bool})
  render(){
    const { visible } = this.state
    return (
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
              width='very wide'
            >
            {/* Sidebar Content */}
              <SideBarContent contentId={0} closeSideBar={this.setVisible}/>
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <NavbarView openModal={this.setVisible} />
                <Segment basic>
                  <PoseGroup>
                    <RouteContainer key='uniqueKey'> {/* Normally 'location.key' should replaced uniqueKey */}
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
                    </RouteContainer>
                  </PoseGroup>
                </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        )}
      />
    );
  }
}

export default connect(mapStateToProps)(App);

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
