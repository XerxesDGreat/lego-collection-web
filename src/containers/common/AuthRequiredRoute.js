import * as auth from "../../api/authApi";
import {Route, Redirect} from 'react-router-dom';
import React from 'react';

const AuthRequiredRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.loggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/users/login',
                    state: {from: props.location}
                }} />
            )
        }
    />
);

export default AuthRequiredRoute;