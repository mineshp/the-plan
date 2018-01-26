import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../actions/authentication';
import { addNotification } from '../../actions/notification';
import RegisterForm from '../../components/Authentication/Register';

class Register extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            formErrors: {
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            },
            emailValid: false,
            usernameValid: false,
            passwordValid: false,
            formValid: false
        };
    }

    registerUser() {
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        this.props.actions.registerUser(userData)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.redirect();
            });
    }

    redirect() {
        this.context.router.history.push('/');
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        },
        () => {
            this.validateField(name, value);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.formValid) {
            this.registerUser();
        }
    }

    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;

        switch (fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'username':
            usernameValid = value.length >= 6;
            fieldValidationErrors.username = usernameValid ? '' : ' is too short';
            // TODO Check if username already exists query api
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '' : ' is too short';
            break;
        case 'confirmPassword':
            confirmPasswordValid = this.state.password && value === this.state.password;
            fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : ' does not match';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            usernameValid,
            passwordValid,
            confirmPasswordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid &&
                this.state.usernameValid &&
                this.state.passwordValid &&
                this.state.confirmPasswordValid
        });
    }

    render() {
        return (
            <div>
                <RegisterForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    data={this.state}
                    formErrors={this.state.formErrors}
                />
            </div>
        );
    }
}

Register.propTypes = {
    actions: PropTypes.shape({
        registerUser: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

Register.defaultProps = {
    actions: null,
    authentication: null,
    notification: null
};

Register.contextTypes = {
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
            registerUser, addNotification
        }, dispatch)
    }
);

const RegisterConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export {
    Register,
    RegisterConnectedComponent
};
