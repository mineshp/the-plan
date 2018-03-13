import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUser, retrieveUsers } from '../../actions/controlCenter';
import { addNotification } from '../../actions/notification';
import ControlCenterComponent from '../../components/Admin/ControlCenter';
import LoadingComponent from '../../components/Shared/Loading';

class ControlCenter extends Component {
    constructor(props) {
        super(props);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.handleResetPwd = this.handleResetPwd.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    fetchAllUsers() {
        this.props.actions.retrieveUsers()
            .then((data) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: data.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });

                this.props.actions.addNotification(notification);
            });
    }

    handleResetPwd(event, data) {
        console.log('reset pwd for id', data.id);
    }

    async handleDeleteUser(event, data) {
        event.preventDefault();
        await this.props.actions.deleteUser(data.id)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.fetchAllUsers();
            });
    }

    render() {
        const { admin } = this.props;
        return (
            (!admin.controlCenter || !admin.controlCenter.users)
                ? <LoadingComponent />
                : <ControlCenterComponent
                    handleResetPwd={this.handleResetPwd}
                    handleDeleteUser={this.handleDeleteUser}
                    users={admin.controlCenter.users}
                />
        );
    }
}

ControlCenter.propTypes = {
    actions: PropTypes.shape({
        retrieveUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    admin: PropTypes.shape({}),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

ControlCenter.defaultProps = {
    actions: null,
    notification: null,
    admin: null
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        admin: state.controlCenter,
        notification: state.controlCenter.notification
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            retrieveUsers, deleteUser, addNotification
        }, dispatch)
    }
);

const ControlCenterConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlCenter);

export {
    ControlCenter,
    ControlCenterConnectedComponent
};
