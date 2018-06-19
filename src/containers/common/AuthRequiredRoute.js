import * as auth from "../../api/authApi";
import {Route, Redirect} from 'react-router-dom';
import React from 'react';

const AuthRequiredRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (auth.loggedIn()) {
                console.log('logged in');
                return <Component {...props} />
            } else {
                console.log('not logged in; redirecting');
                const redirectProps = {
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                };
                return (<Redirect to={redirectProps} />);
            }
        }
        }
    />
);

export default AuthRequiredRoute;