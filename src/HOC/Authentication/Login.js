import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/authentication';
import { addNotification } from '../../actions/notification';
import LoginForm from '../../components/Authentication/Login';

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            formValid: false
        };
    }

    loginUser() {
        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.actions.loginUser(loginDetails)
            .then((loginStatus) => {
                console.log('HERE')
                this.props.actions.addNotification(this.props.notification);
                console.log('loginStatus', loginStatus);
                if (loginStatus.type === 'SUCCESS_LOGIN') {
                    console.log('success login');
                    this.context.router.history.push('/');
                } else {
                    console.log('error login');
                    this.context.router.history.push('/user/login');
                }
            });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            this.loginUser();
        }
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
