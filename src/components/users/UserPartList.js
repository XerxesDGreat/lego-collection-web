import React from 'react';
import PropTypes from 'prop-types';

const UserPartList = props => (
    <div>User Part List</div>
);

UserPartList.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({

    }))
};

export default UserPartList;