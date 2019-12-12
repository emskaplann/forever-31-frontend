import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react'
import ResponsiveMenu from 'react-responsive-navbar';

class Navbar extends Component {
  render() {
    return (
      <ResponsiveMenu
        menuOpenButton={<div />}
        menuCloseButton={<div />}
        changeMenuOn="500px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
          <Grid>
          <Grid.Row>
            <Menu.Item>
              item 1
            </Menu.Item>
            <Menu.Item>
              item 1
            </Menu.Item>
            <Menu.Item>
              item 1
            </Menu.Item>
          </Grid.Row>
          </Grid>
        }
      />
    );
  }
}

export default Navbar;
