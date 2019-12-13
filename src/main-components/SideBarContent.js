import React from 'react';
import RenderSign from '../sub-components/sidebar/RenderSign.js';
import RenderProduct from '../sub-components/sidebar/RenderProduct.js';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input } from 'semantic-ui-react'

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
}

class SideBarContent extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  renderProducts = () => this.props.products.map(product => <RenderProduct product={product} />)

// this function renders sidebar content based on given props
  renderContent = () => {
    if (this.props.contentId === 0 ) {
      return( <RenderSign /> )
    } else if (this.props.contentId === 1) {
      return( this.renderProducts() )
    }
  }

  render () {
    return(
      <Container>
        <Icon name='close' size='large' onClick={() => this.props.closeSideBar(false)} style={{color: '#fff', marginTop: 5}}></Icon>
        {this.renderContent()}
        {/* this.renderProducts() */}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(SideBarContent);
