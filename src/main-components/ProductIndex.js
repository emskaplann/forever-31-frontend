import React from 'react';
import ProductCardComponent from '../sub-components/ProductCardComponent.js'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

const renderCards = products => (
      products.map(product => (
      <Grid.Column width={4} key={`grid${product.id}`}>
        <ProductCardComponent key={product.id} displayName={product.display_name} imgUrl={product.images[0].front_url} />
      </Grid.Column>
    ))
)

class ProductIndex extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render(){
    return(
      <Grid container>
        {renderCards(this.props.products.flat())}
      </Grid>
    )
  }
}


export default connect(mapStateToProps)(ProductIndex);
