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

const prosInRows = (pros) => {
  const size = 4
  const arrayOfArrays = []
  for (var i = 0; i < pros.length; i += size) {
    arrayOfArrays.push(pros.slice(i, i + size))
  }
  return arrayOfArrays
}

const renderRows = (products) => {
  return prosInRows(products).map((row, index) => renderRow(row, index))
}

const renderRow = (row, index) => (
  <Grid.Row>
    {
      row.map(product => (
      <Grid.Column>
        <ProductCardComponent key={product.id} displayName={product.display_name} imgUrl={product.images[0].front_url} />
      </Grid.Column>
    ))
    }
  </Grid.Row>
)


function App(props) {
  // debugger
  // const products = props.products.flat().map(product => <ProductCardComponent key={product.id} i={1} displayName={product.display_name} imgUrl={product.images[0].front_url} />)
  return (
    <Grid columns={4}>
        {renderRows(props.products.flat())}
    </Grid>

  );
}

export default connect(mapStateToProps)(App);
