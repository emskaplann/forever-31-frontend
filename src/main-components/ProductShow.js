import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

class ProductShow extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render () {
    return(
      <>
      </>
    )
  }
}

export default connect(mapStateToProps)(ProductShow);
