import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class LeftHandMenu extends Component {
    constructor() {
        super();
        this.state = { activeItem: 'view' };
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu fluid vertical tabular>
                <Menu.Item name="view" active={activeItem === 'view'} onClick={this.handleItemClick} />
                <Menu.Item name="create" active={activeItem === 'create'} onClick={this.handleItemClick} href="/project/create" />
                <Menu.Item name="search" active={activeItem === 'search'} onClick={this.handleItemClick} />
            </Menu>
        );
    }
}
