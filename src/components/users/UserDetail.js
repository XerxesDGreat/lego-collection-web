import React from 'react';
import PropTypes from 'prop-types';

const UserDetail = props => {
    const {username, email} = props;
    return (
        <div className="user-details">
            <div className="user-details-title">User Details</div>
            <div className="user-details-detail">Username: {username}</div>
            <div className="user-details-detail">Email: {email}</div>
        </div>
    )
};

UserDetail.propTypes = {
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
};

export default UserDetail;