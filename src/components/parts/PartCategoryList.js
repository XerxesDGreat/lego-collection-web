import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PartCategoryList = props => (
    <ul className="list-group">
        {props.partCategories.map(partCategory => (
            <Link to={"/part-categories/" + partCategory.id}
                  key={"partCategory" + partCategory.id}
                  className="list-group-item d-flex justify-content-between align-items-center">
                {partCategory.name}
                <span className="badge badge-primary badge-pill">{partCategory.numParts}</span>
            </Link>
        ))}
    </ul>
);

PartCategoryList.propTypes = {
    // can expand this for the shape
    partCategories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            numParts: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default PartCategoryList;