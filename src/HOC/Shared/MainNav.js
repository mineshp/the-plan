import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authentication';
import MainNavComponent from '../../components/MainNav';

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.actions.logout();
    }

    /* istanbul ignore next: not testing render */
    render() {
        return (
            <MainNavComponent
                username={this.props.username}
                isAdmin={this.props.isAdmin}
                logout={this.logout}
            />
        );
    }
}

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => ({
    username: state.authentication.user.username,
    isAdmin: state.authentication.user.isAdmin
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({ logout }, dispatch)
    }
);

const MainNavConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNav);

MainNav.propTypes = {
    username: PropTypes.string,
    isAdmin: PropTypes.bool,
    actions: PropTypes.shape({
        logout: PropTypes.func.isRequired
    })
};

MainNav.defaultProps = {
    username: null,
    isAdmin: false,
    actions: null,
};

export {
    MainNav,
    MainNavConnectedComponent
};
