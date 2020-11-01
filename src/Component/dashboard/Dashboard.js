import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logOutUser } from '../../action/authActions';
import profileIcon from '../../images/profileIcon.png';
import logo1 from '../../images/logo1.webp'

import './Dashboard.css';



class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            toggle: false,
            seletedItem: "student"
        }
    }
    componentDidMount = () => {
        this.props.history.push("/dashboard/students")
    }

    toggleHanlder = () => {
        const { toggle } = this.state
        this.setState({ toggle: !toggle })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logOutUser();
    };

    selectHandler = (item) => {
        this.setState({ seletedItem: item })
    }

    render() {
        const { user } = this.props.auth
        return (
            <div style={{ height: "75vm" }} className="">
                <div className="navbar-container">
                    <div className="image-wrapper">
                        <img src={logo1} className="navbar-image" />
                    </div>
                    <div className="">
                        <img src={profileIcon} className="navbar-profileIcon"
                            onClick={this.toggleHanlder}
                        />
                        <div className={this.state.toggle ? "button-wrapper" : "navbar-button-hide"}>
                            <button
                                style={{
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="navbar-button"
                            >Logout
                        </button>
                        </div>
                    </div>
                </div>
                <div className="Container">
                    <div className="sidebar-container">
                        <ul className="sidebar-list">
                            <li
                                className={this.state.seletedItem === "student" ? "sidebar-items-active" : "sidebar-items"}
                                onClick={() => this.selectHandler("student")}>
                                <Link to="/dashboard/students" className="item-students">
                                    Students
                                    </Link>
                            </li>
                            <li
                                className={this.state.seletedItem === "employee" ? "sidebar-items-active" : "sidebar-items"}
                                onClick={() => this.selectHandler("employee")
                                }>
                                <Link to="/dashboard/employee" className="item-students">
                                    Employee
                                     </Link>
                            </li>
                            <li
                                className={this.state.seletedItem === "title2" ? "sidebar-items-active" : "sidebar-items"}
                                onClick={() => this.selectHandler("title2")
                                }>
                                <Link className="item-students">title-2</Link></li>
                            <li
                                className={this.state.seletedItem === "title3" ? "sidebar-items-active" : "sidebar-items"}
                                onClick={() => this.selectHandler("title3")
                                }>
                                <Link className="item-students">title-3</Link></li>
                            <li
                                className={this.state.seletedItem === "title4" ? "sidebar-items-active" : "sidebar-items"}
                                onClick={() => this.selectHandler("title4")
                                }>
                                <Link className="item-students">title-4</Link></li>
                        </ul>
                    </div>
                    {/* <div className="sidebar-content">
                        <h1>Content</h1>
                    </div> */}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logOutUser })(Dashboard); 