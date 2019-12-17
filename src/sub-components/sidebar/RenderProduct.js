import React from 'react';
import CartAndWishlistService from '../../services/CartAndWishlistService.js';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Row, Col, Container } from 'react-bootstrap';
import { Card, Icon, Input } from 'semantic-ui-react';

class RenderProduct extends React.Component {
  constructor () {
    super ();
    this.state = {
    }
    this.cartAndWishlistService = new CartAndWishlistService(this)
  }

  // renderDesc = () => {
  //   // example of a desc1: "<style> .d_wrapper {  padding: 5px 0;  font-family: arial, helvetica, san-serif;  font-size: 12px; } .d_wrapper h3 {  font-weight: bold;  text-transform: capitalize; } .d_content > p {  color: #888;  margin: .5em 0;} .d_content span {  display: inline-block;  width: 100%;  line-height: 16px;  padding: 5px 0; }</style><section class="d_wrapper"><h3>Details</h3><div class="d_content">A cable knit mini blouson dress featuring an off-the-shoulder neckline, long dolman sleeves, and a ribbed hem.</div></section><section class="d_wrapper"><h3>Content + Care</h3><div class="d_content"><p>- 100% acrylic</p><p>- Machine wash cold</p></div></section><section class="d_wrapper"><h3>Size + Fit</h3><div class="d_content"><p>- Model is 5'8" and wearing a Small</p></div></section>"
  //   const parser = new DOMParser();
  //   const desc1 = this.props.product.description
  //   const desc2 = desc1.replace('12px', '10px')
  //   const desc3 = desc2.replace('h3', 'h5')
  //   return (<div>{ ReactHtmlParser(desc2) }</div>);
  // }

  discardProductFromCard = (productId) => this.cartAndWishlistService.discardProductFromCard(this.props.user.token, productId)

  render () {
    const product = this.props.product
    return (
        <>
          <Row>
            <Col xs={3} sm={3} md={3}>
              <Card style={{width: '60px', height: '90px', marginRight: 5}} fluid image={this.props.productImages.front_url}/>
            </Col>
            <Col xs={8} sm={7} md={7}>
              <Row>
                <Col sm={12} lg={12}>
                  <span style={{color: '#fff'}}>{product.display_name}</span>
                </Col>
                <Col sm={6} lg={6}>
                  <Icon style={{color: '#fff'}} size='small' name='tag' />
                  {product.on_sale ? (<span style={{color: '#fff'}}>On Sale!</span>) : null}
                </Col>
                <Col sm={6} lg={6}>
                  <p style={{color: '#fff'}}>{product.list_price}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={1} sm={2} md={2}>
              <Icon onClick={() => this.discardProductFromCard(product.id)} style={{color: '#fff'}} name='close' />
            </Col>
          </Row>
        <br />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, mergeProps) => {
    return {
      discardProductFromCard: (newCart) => {
        dispatch({
          type: 'DISCARD_PRODUCT_FROM_CARD',
          newCart: newCart
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderProduct);
