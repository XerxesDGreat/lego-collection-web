import React from 'react';
import PropTypes from 'prop-types';

const addNullEntry = optionValueList => {
    return [
        {
            id: -1,
            name: "-- none selected --"
        },
        ...optionValueList,
    ]
};

const generateSelectOptions = optionValueList => {
    return addNullEntry(optionValueList).map(partCategory => (
            <option value={partCategory.id} key={"option" + partCategory.id}>
                {partCategory.name}
            </option>
        ));
};

const getFilterSelectBox = (optionValueList, selectedCategory, onChangeCategory) => {
    return optionValueList ?
        ( <select onChange={onChangeCategory}
                  value={selectedCategory}
        >
            {generateSelectOptions(optionValueList)}
        </select> ) :
        "loading";
};

// maybe this could be a filter on change, not on button click
const PartFilterForm = props => (
    <form onSubmit={null}>
        <label>Category</label>
        {getFilterSelectBox(props.optionValueList, props.selectedCategory, props.onChangeCategory)}
    </form>
);

PartFilterForm.propTypes = {
    optionValueList: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string,
    onChangeCategory: PropTypes.func.isRequired
};

export default PartFilterForm;

