import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Card, Image } from 'semantic-ui-react';
import { Col, Row } from 'react-bootstrap';

const Box = posed.div({
  hoverable: true,
  pressable: true,
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }, init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  }, hover: {
    opacity: 0.9,
    scale: 1.05,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }, press: {
    scale: 1.02,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
});

const DetailsOnBox = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    opacity: 0,
  }, hover: {
    opacity: 0.86,
    scale: 1,
  }, press: {
    scale: 1,
  }
});

class ProductCardComponent extends React.Component {
  state = { isVisible: false }

  componentDidMount(){
    this.setState({isVisible: !this.state.isVisible})
  }

  render(){
    const { isVisible } = this.state
      return(
          <PoseGroup>
            {isVisible && (
                <Box key='box' className='box' style={{position: 'relative'}}>
                  <Card>
                    <Image src={this.props.imgUrl} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 4}} wrapped />
                      <DetailsOnBox style={{position: 'absolute', width: '100%'}}>
                        <Card.Content extra>
                          <Card.Header style={{borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#000000'}}>
                            <Row>
                              <Col sm={3}>
                                <span style={{color: '#fff'}}>$12.99</span>
                              </Col>
                              <Col sm={19}>
                                <span style={{color: '#fff' }}>Nice Good Clothe BLA bla Bla</span>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Card.Content>
                      </DetailsOnBox>
                  </Card>
                </Box>
            )}
          </PoseGroup>
      )
    }
  }

export default ProductCardComponent
