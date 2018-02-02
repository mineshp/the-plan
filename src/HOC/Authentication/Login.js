import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/authentication';
import { addNotification } from '../../actions/notification';
import LoginForm from '../../components/Authentication/Login';
import Auth from './Auth';

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.auth = new Auth();

        this.state = {
            username: null,
            password: null
        };
    }

    async loginUser() {
        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        };

        const loginStatus = await this.props.actions.loginUser(loginDetails);

        this.props.actions.addNotification(this.props.notification);
        if (loginStatus.type === 'SUCCESS_LOGIN') {
            this.auth.setToken(loginStatus.token);
            this.context.router.history.push('/');
        } else {
            this.context.router.history.push('/user/login');
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            return this.loginUser();
        }
        return undefined;
    }

    render() {
        return (
            <div>
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    data={this.state}
                />
            </div>
        );
    }
}

Login.propTypes = {
    actions: PropTypes.shape({
        loginUser: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

Login.defaultProps = {
    actions: null,
    authentication: null,
    notification: null
};

Login.contextTypes = {
    router: PropTypes.object
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        authentication: state.authentication,
        notification: state.authentication.notification
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            loginUser, addNotification
        }, dispatch)
    }
);

const LoginConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export {
    Login,
    LoginConnectedComponent
};
