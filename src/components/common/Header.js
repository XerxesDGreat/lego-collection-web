import React from 'react';
import {Link} from 'react-router-dom';
import {getBaseUrl} from '../../config';

class Header extends React.Component {
    render() {
        return (
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
                        <Link to="/parts">Parts</Link>
                    </nav>
                </div>
            </div>
        )
    }
};

export default Header;