import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Dimmer, Header, Divider, Loader, Card, Image } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';


class ProductShow extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    const product = this.props.product

    return(
      <Container style={{marginTop: 30, marginBottom: 10}}>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Card>
              <Image src={product.images[0].front_url} />
            </Card>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            { ReactHtmlParser(product.description) }
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Row>
              <Col style={{textAlign: 'left', paddingLeft: 0}} sm={true}>
                Shipping Fee: {product.shipping_fee}
              </Col>
            </Row>
            <Row>
              <Col style={{textAlign: 'left', paddingLeft: 0}} sm={true}>
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
