import React from 'react'
import {login} from '../../api/authApi';
import {Redirect} from 'react-router-dom';

class UserLoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        login(username, password, (loggedIn) => {
            if (loggedIn) {
                this.setState({
                    redirectToReferrer: true
                });
            }
        });
    }

    render() {
        const {from} = this.props.location.state || { from: {pathname: "/users/dashboard"}};
        const {redirectToReferrer} = this.state;
        return redirectToReferrer ?
            (<Redirect to={from} />) : (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" ref="username" /><br />
                    <input type="password" placeholder="password" ref="password" /><br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default UserLoginPage;
