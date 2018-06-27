import React from 'react';
import PropTypes from 'prop-types';
import ElementListItem from './ElementListItem';

const ElementList = props => {
    const {elements, loading} = props;
    if (loading) {
        return <div>loading elements...</div>
    } else {
        return (
            <ul>
                {elements.map(element => <ElementListItem key={element.id}
                                                          element={element} />)}
            </ul>
        );
    }
};

ElementList.propTypes = {
    elements: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ElementList;