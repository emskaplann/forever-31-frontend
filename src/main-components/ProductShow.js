import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader, Card, Image, Button } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

const carouselItems = []

class ProductShow extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  componentDidMount () {
    for (const productImages in this.props.product.images[0]) {
      console.log(productImages)
      if (productImages.normalize().includes('url') && !productImages.normalize().includes('detail') &&  !productImages.normalize().includes('small')){
        carouselItems.push(
          <Carousel.Item>
            <Image src={this.props.product.images[0][productImages]} />
          </Carousel.Item>
        )
      } else {

      }
    }
  }

  render () {
    const product = this.props.product

    return(
      <Container style={{marginTop: 30, marginBottom: 10}}>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            {/* Carousel START */}
              <Carousel style={{color: "#000000"}}>
                {carouselItems}
              </Carousel>
            {/* Carousel END */}
            <h4 style={{fontWeight: 'bold'}}>{product.display_name}</h4>
            <Divider />
            <Row style={{justifyContent: 'space-between'}}>
              <Col style={{justifyContent: 'flex-start'}} xs={2} sm={2} md={2} lg={2}>
                <h6 style={{fontWeight: 'bold'}}>{product.list_price}</h6>
              </Col>
              <Col style={{textAlign: 'center', }} xs={8} sm={8} md={8} lg={8}>
                <Button fluid style={{}}> Add To Cart </Button>
              </Col>
              <Col style={{justifyContent: 'flex-end'}} xs={2} sm={2} md={2} lg={2}>
                <h6 style={{fontWeight: 'bold'}}>{product.shipping_fee}</h6>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            { ReactHtmlParser(product.description) }
          </Col>
          <Col xs={12} sm={3} md={2} lg={2}>
            <Row>
              <Col style={{textAlign: 'left', paddingLeft: 0}} xs={6} sm={12} md={4} lg={12}>
                Shipping Fee: {product.shipping_fee}
              </Col>
              <Col style={{textAlign: 'left', paddingLeft: 0}} xs={6} sm={6} md={12} lg={12}>
                Student Deal: {product.student_deal ? 'Yes' : 'No'}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // fetching the product from the state for show page
  const productId = ownProps.match.params.id
  return {
    user: state.user,
    product: state.products.find(product => product.id == productId)
  }
}

export default connect(mapStateToProps)(ProductShow);
