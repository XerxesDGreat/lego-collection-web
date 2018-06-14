import React from 'react';
import PropTypes from 'prop-types';

const ElementListItem = props => {
    const {element} = props;
    return (
        <li key={element.id}>
            <div>
                <img src={element.image_url} alt={"image for " + element.id}/>
                {element.id} |
                {element.part} |
                {element.color}
            </div>
        </li>
    );
};

ElementListItem.propTypes = {
    element: PropTypes.shape({
        id: PropTypes.number.isRequired,
        part: PropTypes.number.isRequired,
        color: PropTypes.number.isRequired,
        image_url: PropTypes.string.isRequired
    }).isRequired
};

const ElementList = props => {
    const {elements, loading} = props;
    if (loading) {
        return <div>loading elements...</div>
    } else if (elements.length < 1) {
        return <div>nothing</div>
    } else {
        return (
            <ul>
                {elements.map(element => <ElementListItem element={element} />)}
            </ul>
        );
    }
};

ElementList.propTypes = {
    elements: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ElementList;