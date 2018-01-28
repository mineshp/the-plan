import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import logo from '../md-logo-green.png';

export default class MainNav extends Component {
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
            <Menu>
                <Menu.Item
                    href="/"
                    name="home"
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <img alt="logo" src={logo} />
                </Menu.Item>

                <Dropdown item text="Projects">
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleItemClick} href="/project/all">List</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleItemClick} href="/project/update">Create</Dropdown.Item>
                        <Dropdown.Item>Search</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text="Lists">
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleItemClick} href="/list/all">List</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleItemClick} href="/list/update">Create</Dropdown.Item>
                        <Dropdown.Item>Search</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item>
                    <span className="moto">Haz tus sueños realidad</span>
                </Menu.Item>


                <Menu.Item
                    href="/user/login"
                    position="right"
                    name="sign-in"
                    active={activeItem === 'sign-in'}
                    onClick={this.handleItemClick}
                >Sign-in
                </Menu.Item>
            </Menu>
        );
    }
}
