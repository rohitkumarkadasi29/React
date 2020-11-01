import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';


class Navbar extends Component {
    render() {
        return (
            <div className="">
                <nav className="">
                    <div className="">
                        <Link to="/" style={{ fontFamily: "monospace" }} className="">
                        </Link>
                        <div className="">
                            <div className="navbar-button-wrapper">
                                <div>
                                    <h1 className="website-name">website name</h1>
                                </div>
                                <h1></h1>
                                <div className="login-register-wrapper">
                                    <div className="">
                                        <Link
                                            to="/register"
                                            style={{
                                                width: "140px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="loginBtn"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to="/login"
                                            style={{
                                                width: "140px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="loginBtn"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;