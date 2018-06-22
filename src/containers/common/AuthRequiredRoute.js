import * as auth from "../../api/authApi";
import {Route, Redirect} from 'react-router-dom';
import React from 'react';

const AuthRequiredRoute = ({component: Component, componentProps, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (auth.loggedIn()) {
                const propsToPass = {
                    ...props,
                    ...componentProps
                };
                return <Component {...propsToPass} />
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