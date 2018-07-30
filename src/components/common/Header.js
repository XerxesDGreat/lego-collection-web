import React from 'react';
import {Link} from 'react-router-dom';
import {routes} from '../../config';

const getUserLink = loggedInUser => {
    return loggedInUser !== undefined ?
        <Link to={routes.myDashboard}>{loggedInUser.username + "'s"} Dashboard</Link> :
        <Link to={routes.login}>Login</Link>;
};

const Header = props => (
    <div className="header">
        <div className="App-header">
            <img src="/cooltext283823557300489.png" alt="logo"/>
            <div className="App-intro">
                Manage your LEGO sets here
            </div>
            <nav>
                <Link to={routes.home}>Home</Link>
                {" | "}
                <Link to={routes.setList}>Models</Link>
                {" | "}
                <Link to={routes.partList}>Part Browser</Link>
                {" | "}
                {getUserLink(props.loggedInUser)}
            </nav>
        </div>
    </div>
);

export default Header;