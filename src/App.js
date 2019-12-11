import React from 'react';
import './App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  return {
    products: state.products
  }
}


function App(props) {
  // debugger
  const products = props.products.flat().map(product => <img key={product.id} src={product.images[0].front_url}/>)
  return (
    <div>
      {products}
    </div>
  );
}

export default connect(mapStateToProps)(App);
