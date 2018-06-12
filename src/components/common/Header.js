import React from 'react';
import {Link} from 'react-router-dom';

const getUserLink = loggedInUser=> {
    return (loggedInUser) ?
        <Link to="/users/dashboard">{loggedInUser.username + "'s"} Dashboard</Link> :
        <Link to="/users/login">Login</Link>;
};

const Header = props => (
    <div className="header">
        <div className="App-header">
            <img src="/cooltext283823557300489.png" alt="logo"/>
            <div className="App-intro">
                Manage your LEGO sets here
            </div>
            <nav>
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/models">Models</Link>
                {" | "}
                <Link to="/parts">Part Browser</Link>
                {" | "}
                {getUserLink(props.loggedInUser)}
            </nav>
        </div>
    </div>
);

export default Header;