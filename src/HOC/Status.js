import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StatusComponent from '../components/Status';
import LoadingComponent from '../components/Shared/Loading';

class Status extends Component {
    constructor(props) {
        super(props);
        this.applicationStatus = this.applicationStatus.bind(this);
    }

    componentDidMount() {
        this.applicationStatus();
    }

    applicationStatus() {
        this.setState({
            applicationStatus: {
                appStatus: 'OK'
            }
        });
    }

    /* istanbul ignore next: not testing render */
    render() {
        return (
            !this.state.applicationStatus
                ? <LoadingComponent />
                : <StatusComponent
                    statusData={this.state.applicationStatus}
                />
        );
    }
}

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => ({
    username: state.authentication.user.username
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        // actions: bindActionCreators({ logout }, dispatch)
    }
);

const StatusConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Status);

Status.propTypes = {
    // username: PropTypes.string,
    // actions: PropTypes.shape({
    //     logout: PropTypes.func.isRequired
    // })
};

Status.defaultProps = {
    username: null,
    actions: null,
};

export {
    Status,
    StatusConnectedComponent
};
