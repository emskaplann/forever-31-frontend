import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';

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
    scale: 0.9,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  }, hover: {
    scale: 1.2,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }, press: {
    scale: 1.05,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
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
                <Box key='box' className='box'>
                  <Card>
                    <Image src={this.props.imgUrl} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header style={{fontSize: 15}}>{this.props.displayName}</Card.Header>
                      <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                      </Card.Meta>
                      <Card.Description>
                        Matthew is a musician living in Nashville.
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        22 Friends
                      </a>
                    </Card.Content>
                  </Card>
                </Box>
            )}
          </PoseGroup>
      )
    }
  }

export default ProductCardComponent
