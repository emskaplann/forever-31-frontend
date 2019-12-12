import React from 'react';
import StripeCheckout from './main-components/StripeCheckout.js';
import ProductCardComponent from './sub-components/ProductCardComponent.js';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  return {
    products: state.products
  }
}


function App(props) {
  // debugger
  const products = props.products.flat().map(product => <ProductCardComponent key={product.id} i={1} displayName={product.display_name} imgUrl={product.images[0].front_url} />)
  return (
    <Grid>
      <Grid.Row>
        {products}
      </Grid.Row>
    </Grid>

  );
}

export default connect(mapStateToProps)(App);
