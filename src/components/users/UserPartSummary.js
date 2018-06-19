import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {routes} from '../../config';

const UserPartSummary = props => {
    const {storage, display} = props;
    return (
        <div className="part-info">
            <div className="part-info-title">Parts</div>
            <div className="part-info-detail">You have {storage + display} parts total</div>
            <div className="part-info-detail">{storage} in storage, and {display} on display</div>
            <div className="part-link">
                <Link to={routes.myPartList}>All My Parts</Link>
            </div>
        </div>
    );
};

UserPartSummary.propTypes = {
    storage: PropTypes.number.isRequired,
    display: PropTypes.number.isRequired
};

export default UserPartSummary;