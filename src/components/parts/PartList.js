import React from 'react';
import PropTypes from 'prop-types';
import PartCardContainer from '../../containers/parts/PartCardContainer';

const PartList = props => {
    const {parts, onPartCardClick} = props;
    return parts.length > 0 ?
        (
            <div>
                {parts.map(part => <PartCardContainer part={part}
                                                      partNum={part.part_num}
                                                      key={part.part_num} />)}
            </div>
        ) : (
            <div>
                nothing
            </div>
        );
};

PartList.propTypes = {
    // can expand this for the shape
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            part_num: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            thumbnail_url: PropTypes.string.isRequired,
            storage: PropTypes.number,
            display: PropTypes.number,
            color_count: PropTypes.number
        }).isRequired
    ).isRequired//,
    //onPartCardClick: PropTypes.func.isRequired
};

export default PartList;