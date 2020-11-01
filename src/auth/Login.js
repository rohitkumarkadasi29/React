import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../action/authActions';
import classnames from 'classnames';
import './login.css';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: {}
        }
    }

    componentDidMount = () => {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dasdboard");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard") // push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);  // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.props;

        return (
            <div className="">
                <div className="">
                    <div className="login-wrapper">
                        <Link to="/" className="link">
                            <i className="material-icons">keyboard_backspace</i><span className="back-to-home"> Back to home</span>
                        </Link>
                        <div className="form-container">
                            <div className="" style={{ padding: "11.250px" }}>
                                <h4 className="heading-login">
                                    <b>Login</b>
                            </h4>
                            </div>
                            <form onValidate onSubmit={this.onSubmit}>
                                <div className="">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        errors={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })}
                                        placeholder="Email"
                                        className="email-password-input"
                                    />

                                    <span className="errors-wrapper adjust">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                                </div>
                                <div className="">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        errors={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password || errors.passwordincorrect
                                        })}
                                        placeholder="Password"
                                        className="email-password-input password-wrapper"
                                    />
                                    <span className="errors-wrapper adjust">
                                        {errors.password}
                                        {errors.passwordincorrect}
                                    </span>
                                </div>
                                <div>
                                <p className="text-message">Don't have an account?
                            <Link to="/register" className="redirector">Register</Link>
                                </p>
                                    <button
                                        style={{
                                            width: "150px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1 rem"
                                        }}
                                        type="submit"
                                        className="login-button"
                                    >
                                        Login
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

