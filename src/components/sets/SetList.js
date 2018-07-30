import React from 'react';
import PropTypes from 'prop-types';
import SetCardContainer from '../../containers/sets/SetCardContainer';

const SetList = props => {
    const {sets, /*onPartCardClick, modalName, paginationComponent*/} = props;
    return sets.length > 0 ?
        (
            <div>
                {/*{paginationComponent}*/}
                <div className="setContainer clearfix">
                    {sets.map(set => (<SetCardContainer set={set}
                                                        setNum={set.set_num}
                                                        key={set.set_num} />
                                                        // onPartCardClick={onPartCardClick}
                                                        // modalName={modalName} />))
                        ))}
                </div>
                {/*{paginationComponent}*/}
            </div>
        ) : (
            <div>
                nothing
            </div>
        );
};

SetList.propTypes = {
    // can expand this for the shape
    sets: PropTypes.array.isRequired,
    // onPartCardClick: PropTypes.func.isRequired,
    // modalName: PropTypes.string.isRequired,
    // paginationComponent: PropTypes.object.isRequired
};

export default SetList;