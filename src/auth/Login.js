import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../action/authActions';
import classnames from 'classnames';


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
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ padding: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">Already have an account?
                            <Link to="/login">Login</Link>
                            </p>
                        </div>
                        <form onValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    errors={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    errors={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1 rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
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

export default connect(mapStateToProps, {loginUser}) (Login);

