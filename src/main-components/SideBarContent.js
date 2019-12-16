import React from 'react';
import RenderSign from '../sub-components/sidebar/RenderSign.js';
import RenderProduct from '../sub-components/sidebar/RenderProduct.js';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input } from 'semantic-ui-react'

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    user: state.user
  }
}

class SideBarContent extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

// render cart for logged in user
  renderCart = () => this.props.products.map(product => <RenderProduct key={product.id} product={product} />)

// this function renders sidebar content based on given props
  renderContent = () => {
    console.log(this.props.contentId)
    if (this.props.contentId === 0 ) {
      return( <RenderSign closeSideBar={this.props.closeSideBar}/> )
    } else if (this.props.contentId === 1 && this.props.user.token) {
      return( this.renderCart() )
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
