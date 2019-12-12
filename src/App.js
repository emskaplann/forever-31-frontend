import React from 'react';
import Checkout from './main-components/Checkout.js';
import ProductCardComponent from './sub-components/ProductCardComponent.js';
import ProductIndex from './main-components/ProductIndex.js'
import { Route, Link, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
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
            <Sidebar
              as={Menu}
              animation='overlay'
              direction='right'
              icon='labeled'
              inverted
              onHide={() => this.setVisible(false)}
              vertical
              visible={visible}
              width='thin'
            >
              <Menu.Item>
                <Icon name='home' />
                <Link to='/checkout'>Checkout!</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <Segment basic>
                <PoseGroup>
                  <RouteContainer key='uniqueKey'> {/* Normally 'location.key' should replaced uniqueKey */}
                    <Switch location={location}>
                      <Route exact path='/' component={ProductIndex} key='index' />
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
