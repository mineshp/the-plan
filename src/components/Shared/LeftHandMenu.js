import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class LeftHandMenu extends Component {
  state = { activeItem: 'view' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled' vertical>
        <Menu.Item name='view' active={activeItem === 'view'} onClick={this.handleItemClick}>
          <Icon name='list layout' />
          View
        </Menu.Item>

        <Menu.Item
            name='create'
            active={activeItem === 'create'}
            onClick={this.handleItemClick}
            href='/project/create'
        >
          <Icon name='add circle' />
          Create
        </Menu.Item>

        <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>
          <Icon name='search' />
          Search
        </Menu.Item>
      </Menu>
    )
  }
}