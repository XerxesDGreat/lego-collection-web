import React from 'react';
import PropTypes from 'prop-types';
import PartCardContainer from '../../containers/parts/PartCardContainer';

const PartList = props => {
    const {parts, onPartCardClick, modalName, paginationComponent} = props;
    return parts.length > 0 ?
        (
            <div>
                {paginationComponent}
                <div className="cardContainer clearfix">
                    {parts.map(part => (<PartCardContainer part={part}
                                                          partNum={part.part_num}
                                                          key={part.part_num}
                                                          onPartCardClick={onPartCardClick}
                                                          modalName={modalName} />))}
                </div>
                {paginationComponent}
            </div>
        ) : (
            <div>
                nothing
            </div>
        );
};

PartList.propTypes = {
    // can expand this for the shape
    parts: PropTypes.array.isRequired,
    onPartCardClick: PropTypes.func.isRequired,
    modalName: PropTypes.string.isRequired,
    paginationComponent: PropTypes.object.isRequired
};

export default PartList;