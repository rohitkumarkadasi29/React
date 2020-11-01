import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

import logo2 from "../../images/logo2.jpg"
import './landing.css';


class Landing extends Component {
    render() {
        return (
            <div className="container">
                   <Navbar />
                
            </div>
        )
    }
}

export default Landing;