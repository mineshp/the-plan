import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainNavComponent from '../../components/MainNav';

class MainNav extends Component {
    /* istanbul ignore next: not testing render */
    render() {
        return (
            <MainNavComponent username={this.props.username} />
        );
    }
}

MainNav.propTypes = {
    username: PropTypes.string
};

MainNav.defaultProps = {
    username: null
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        username: state.authentication.username
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({}, dispatch)
    }
);

const MainNavConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNav);

export {
    MainNav,
    MainNavConnectedComponent
};
