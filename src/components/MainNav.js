import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import logo from '../md-logo-green.png';

export default class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'view',
            moto: null
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    getMotoByUser({ username }) {
        let moto;
        switch (username) {
        case 'minesh':
            moto = 'Haz tus sueños realidad';
            break;
        case 'Jignasha':
            moto = 'Te amo mucho, Bella';
            break;
        default:
            moto = 'Make your dreams a reality';
            break;
        }
        return moto;
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
        const { user } = this.props;

        const displayName = user.username
            ? `${user.username.charAt(0).toUpperCase() + user.username.slice(1)}`
            : null;

        const displayControlCentreItem = user.isAdmin
            ? <Dropdown.Item onClick={this.handleItemClick} as={Link} to="/admin/manage">Control Centre -v{process.env.REACT_APP_VERSION}</Dropdown.Item>
            : null;

        const moto = this.getMotoByUser({ username: user.username });

        return (
            <div className="header-main">
                <Menu>
                    <Menu.Item
                        as={Link}
                        to="/"
                        name="home"
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        <img alt="logo" src={logo} />
                    </Menu.Item>

                    <Dropdown item text="Projects">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleItemClick} as={Link} to="/project/all">List</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleItemClick} as={Link} to="/project/update">Create</Dropdown.Item>
                            <Dropdown.Item disabled>Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown item text="Lists">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleItemClick} as={Link} to="/list/all">List</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleItemClick} as={Link} to="/list/update">Create</Dropdown.Item>
                            <Dropdown.Item disabled>Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item>
                        <span className="moto">{moto}</span>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        {
                            user.username &&
                            <Menu.Item>
                                <Label className="badge-labels" floating color="red">{user.profilesToDisplay.length}</Label>
                                <Button
                                    as={Link}
                                    color="green"
                                    icon="id card"
                                    content="Profile(s)"
                                    to="/user/profile"
                                />
                            </Menu.Item>
                        }

                        {
                            user.username
                                ?
                                (
                                    <Menu.Item>
                                        <Dropdown text={displayName} icon="user" floating labeled button className="icon blue">
                                            <Dropdown.Menu>
                                                {displayControlCentreItem}
                                                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Item>
                                )
                                :
                                (<Menu.Item
                                    as={Link}
                                    to="/user/login"
                                    name="sign-in"
                                    active={activeItem === 'sign-in'}
                                    onClick={this.handleItemClick}
                                >Sign-in
                                </Menu.Item>)
                        }
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

MainNav.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        isAdmin: PropTypes.bool,
        profile: PropTypes.arrayOf(PropTypes.string),
        profilesToDisplay: PropTypes.arrayOf(PropTypes.string),
    }),
    logout: PropTypes.func.isRequired
};

MainNav.defaultProps = {
    user: null
};
