import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class LeftHandMenu extends Component {
  state = { activeItem: 'view' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid vertical tabular>
        <Menu.Item name='view' active={activeItem === 'view'} onClick={this.handleItemClick} />
        <Menu.Item name='create' active={activeItem === 'create'} onClick={this.handleItemClick} href='/project/create' />
        <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
