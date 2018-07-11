import React from 'react';
import PropTypes from 'prop-types';

const getInputOrDisplay = (props, type, displayText, displayValue) => {
    const {onFormBlur, showForm, onFormValueChange, currentForm, formValue, id} = props;
    let child = undefined;
    if (currentForm === type) {
        child = (
            <input type="text"
                   name={type}
                   value={formValue}
                   onChange={onFormValueChange}
                   onBlur={() => onFormBlur(id)}
            />
        );
    } else {
        child = displayText + ": " + displayValue;
    }
    return (
        <span onDoubleClick={() => showForm(type)}>
            {child}
        </span>
    );
};

const ElementListItem = props => {
    const {id, colorId, imageUrl, onDisplay, inStorage, displayFormType, storageFormType} = props;
    return (
        <div className="card w-25 float-left m-1">
            <img className="card-img-top"
                 style={{maxHeight: 100, objectFit: "contain"}}
                 src={imageUrl}
                 alt={"image for " + id} />
            <div className="card-body">
                <h5 className="card-title">Details</h5>
                <div className="card-text">
                    Color: {colorId}<br />
                    Element id: {id}
                </div>
                <h5 className="card-title">Owned</h5>
                <p className="card-text">
                    {getInputOrDisplay(props, displayFormType, "On display", onDisplay)} <br />
                    {getInputOrDisplay(props, storageFormType, "In storage", inStorage)}
                </p>
            </div>
        </div>
    );
};

ElementListItem.propTypes = {
    id: PropTypes.number.isRequired,
    colorId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onDisplay: PropTypes.number.isRequired,
    inStorage: PropTypes.number.isRequired,
    onFormBlur: PropTypes.func.isRequired,
    onFormValueChange: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
    displayFormType: PropTypes.string.isRequired,
    storageFormType: PropTypes.string.isRequired,
    currentForm: PropTypes.string,
    formValue: PropTypes.number
};

export default ElementListItem;