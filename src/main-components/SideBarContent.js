import React from 'react';
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

  renderProducts = () => {
    return this.props.products.map(product => (
      <Row style={{marginTop: 5}}>
        <Col>
          <Card fluid image={product.images[0].front_url}/>
        </Col>
        <Col>
        </Col>
        <Col>
          <Card fluid style={{backgroundColor: '#212529'}}>
            <Card.Header style={{color: '#fff'}}>
              $12.99
            </Card.Header>
          </Card>
        </Col>
      </Row>
    ))
  }

  renderCart = () => {

  }

  renderWishList = () => {

  }

  // this function means rendering sign up or sign in
  renderSign = () => (
    <>
    <Header as='h2' style={{color: '#fff'}}>
      Sign In
    </Header>
    <Row className='justify-content-center'>
      <Input style={{width: '65%'}} iconPosition='left' placeholder='Email'>
        <Icon name='at' />
        <input />
      </Input>
    </Row>
    </>
  )

  render () {
    return(
      <Container>
        {this.renderSign()}
        {this.renderProducts()}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(SideBarContent);
