import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from './main-components/StripeCheckout.js';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  return {
    products: state.products
  }
}


function App(props) {
  // debugger
  // const products = props.products.flat().map(product => <img key={product.id} src={product.images[0].front_url}/>)
  return (
      <StripeProvider apiKey="pk_test_YJZiIQadCitjxkefrqHysj0g00BNRtnusD">
        <div>
          <Elements>
            <StripeCheckout />
          </Elements>
        </div>
      </StripeProvider>
  );
}

export default connect(mapStateToProps)(App);
