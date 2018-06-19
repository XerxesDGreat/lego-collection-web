import React from 'react';
import PropTypes from 'prop-types';
import UserDetail from './UserDetail';
import UserPartSummary from './UserPartSummary';

const UserDashboard = props => {
    return props.user ? (
            <div>
                <UserDetail username={props.user.username}
                            email={props.user.email}
                            id={props.user.id} />
                <UserPartSummary display={props.user.parts.display}
                                 storage={props.user.parts.storage} />
            </div>
        ) : (
            <div>loading</div>
        );
};

UserDashboard.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        parts: PropTypes.shape({
            storage: PropTypes.number.isRequired,
            display: PropTypes.number.isRequired
        }).isRequired
    })
};

export default UserDashboard;