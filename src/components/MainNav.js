import React, { Component } from 'react';
import logo from '../logo.svg';
import { Menu } from 'semantic-ui-react'

export default class MenuNav extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable>
                <Menu.Item
                    href='/'
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <img alt="logo" src={logo} />
                </Menu.Item>

                <Menu.Item
                    name='manage lists'
                    active={activeItem === 'manage-lists'}
                    onClick={this.handleItemClick}
                    href='/list/all'
                    >Manage Lists
                </Menu.Item>

                <Menu.Item
                    name='list'
                    active={activeItem === 'list'}
                    onClick={this.handleItemClick}
                    href='/list'
                    >List
                </Menu.Item>

                <Menu.Item
                    position='right'
                    name='sign-in'
                    active={activeItem === 'sign-in'}
                    onClick={this.handleItemClick}
                    >Sign-in
                </Menu.Item>
            </Menu>
        );
    }
};
