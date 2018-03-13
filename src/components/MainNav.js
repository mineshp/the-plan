import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'semantic-ui-react';
import logo from '../md-logo-green.png';

export default class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'view'
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { activeItem } = this.state;
        const { isAdmin, username } = this.props;
        const displayName = username
            ? `${this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}`
            : null;
        const displayControlCenterItem = isAdmin
            ? <Dropdown.Item onClick={this.handleItemClick} href="/admin/manage">Control Center</Dropdown.Item>
            : null;
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

                {
                    this.props.username
                        ?
                        (
                            <Menu.Item position="right">
                                <Dropdown text={displayName} icon="user" floating labeled button className="icon blue">
                                    <Dropdown.Menu>
                                        {displayControlCenterItem}
                                        <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        )
                        :
                        (<Menu.Item
                            href="/user/login"
                            position="right"
                            name="sign-in"
                            active={activeItem === 'sign-in'}
                            onClick={this.handleItemClick}
                        >Sign-in
                        </Menu.Item>)
                }
            </Menu>
        );
    }
}

MainNav.propTypes = {
    username: PropTypes.string,
    isAdmin: PropTypes.bool,
    logout: PropTypes.func.isRequired
};

MainNav.defaultProps = {
    username: null,
    isAdmin: false
};
