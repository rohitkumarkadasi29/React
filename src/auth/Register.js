import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../action/authActions';
import classnames from 'classnames';
import './register.css';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount = () => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="register-wrapper">
                        <Link to="/" className="link">
                            <i className="material-icons left">keyboard_backspace</i><span className="back-to-home">Back to home</span>
                        </Link>
                        <div className="form-container">
                            <div className="col s12" style={{ padding: "11.250px" }}>
                                <h4 className="heading-login">
                                    <b>Register</b> below
                            </h4>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        className="email-password-input"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.name
                                        })}
                                        placeholder="Name"
                                        className="email-password-input"
                                    />
                                    <span className="errors-wrapper adjust">{errors.name}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        className="email-password-input"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email
                                        })}
                                        placeholder="Email"
                                        className="email-password-input password-wrapper"
                                    />
                                    <span className="errors-wrapper adjust">{errors.email}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                        placeholder="Password"
                                        className="email-password-input password-wrapper"
                                    />
                                    <span className="errors-wrapper adjust">{errors.password}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        className="email-password-input"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password2
                                        })}
                                        placeholder="Confirm Password"
                                        className="email-password-input password-wrapper"
                                    />
                                    <span className="errors-wrapper adjust">{errors.password2}</span>
                                </div>
                                <p className="text-message">Already have an account?
                            <Link to="/login" className="redirector">Login</Link>
                                </p>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                        style={{
                                            width: "150px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1 rem"
                                        }}
                                        type="submit"
                                        className="login-button"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));