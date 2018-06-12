import React from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

// optionValueMap must be a dictionary where the key is the selectable value and the value is the display string
function generateSelectOptions(optionValueList, selected) {
    return optionValueList.map(partCategory => (
            <option value={partCategory.id} key={"option" + partCategory.id}>
                {partCategory.name}
            </option>
        ));
}

function getFilterSelectBox(optionValueList, selectedCategory, onChangeCategory) {
    return optionValueList ?
        ( <FormControl componentClass="select"
                       placeholder="foo"
                       onChange={onChangeCategory}
                       value={selectedCategory}
        >
            {generateSelectOptions(optionValueList, selectedCategory)}
        </FormControl> ) :
        "loading";
}

// maybe this could be a filter on change, not on button click
const PartFilterForm = props => (
    <Form inline>
        <FormGroup>
            <ControlLabel>Category</ControlLabel>
            {getFilterSelectBox(props.optionValueList, props.selectedCategory, props.onChangeCategory)}
        </FormGroup>
    </Form>
);

PartFilterForm.propTypes = {
    optionValueList: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string,
    onChangeCategory: PropTypes.func.isRequired
};

export default PartFilterForm;

