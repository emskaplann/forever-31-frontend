import React from 'react';
import style from './styles/ProductCard.css'
import posed from 'react-pose';
import { Card, Icon, Image } from 'semantic-ui-react';

const Box = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
    scale: 1.2,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }
});

const ProductCardComponent = (props) => (
  <Box>
    <Card style={{margin: 5}}>
      <Image src={props.imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.displayName}</Card.Header>
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
)

export default ProductCardComponent
