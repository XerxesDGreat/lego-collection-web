import React from 'react';
import PropTypes from 'prop-types';
import ElementListItemContainer from '../../containers/elements/ElementListItemContainer';

const getElementListItem = (element, ownedElements) => {
    let storage = 0;
    let display = 0;
    if (ownedElements) {
        const matchingElements = ownedElements.filter(ownedElement => ownedElement.element.id === element.id);
        if (matchingElements.length === 1) {
            const matchingElement = matchingElements[0];
            storage = matchingElement.quantity_in_storage;
            display = matchingElement.quantity_on_display;
        }
    }
    return (
        <ElementListItemContainer key={element.id}
                         id={element.id}
                         partNum={element.part}
                         colorId={element.color}
                         imageUrl={element.image_url}
                         onDisplay={display}
                         inStorage={storage} />
    );
};

const ElementList = props => {
    const {elements, loading, ownedElements} = props;
    if (loading || elements === undefined) {
        return <div>loading elements...</div>
    } else {
        return (
            <div className="w-100">
                {elements.map(element => getElementListItem(element, ownedElements))}
            </div>
        );
    }
};

ElementList.propTypes = {
    elements: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            part: PropTypes.string.isRequired,
            color: PropTypes.number.isRequired,
            image_url: PropTypes.string.isRequired
        })
    ),
    loading: PropTypes.bool.isRequired,
    ownedElements: PropTypes.array.isRequired
};

export default ElementList;