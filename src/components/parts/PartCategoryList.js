import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PartCategoryList = ({partCategories}) => {
    return (
        <ul>
            {partCategories.map(partCategory => (
                <li key={"cat" + partCategory.id}>
                    <Link to={"/parts/" + partCategory.id}>{partCategory.name}</Link>
                </li>
            ))}
        </ul>
    );
};

PartCategoryList.propTypes = {
    partCategories: PropTypes.array.isRequired
};

export default PartCategoryList;