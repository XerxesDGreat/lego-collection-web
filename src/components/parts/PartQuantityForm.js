import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const PartQuantityForm = props => (
    <form>
        <FormGroup>
            <ControlLabel>Quantity Owned (not persisted)</ControlLabel>
            <FormControl type="text"
                         value={props.quantityOwned}
                         bsSize="lg"
                         onBlur={props.onBlur}
                         onChange={props.onChange}
                         disabled={props.isSaving}
            />
        </FormGroup>
    </form>
);

PartQuantityForm.propTypes = {
    quantityOwned: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired
};

export default PartQuantityForm;