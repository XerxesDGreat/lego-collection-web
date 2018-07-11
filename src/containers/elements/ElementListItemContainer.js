import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ElementListItem from '../../components/elements/ElementListItem';
import {updateElementQuantityInStorage} from "../../modules/userElements";

const STORAGE_FORM = 'STORAGE';
const DISPLAY_FORM = 'DISPLAY';

export class ElementListItemContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: undefined,
            formValue: undefined,
            resetValue: undefined,
            inStorage: this.props.inStorage,
            onDisplay: this.props.onDisplay
        };

        this.hideForm = this.hideForm.bind(this);
        this.showForm = this.showForm.bind(this);
        this.handleFormBlur = this.handleFormBlur.bind(this);
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
    }

    hideForm() {
        this.setState({
            showForm: undefined,
            formValue: undefined,
            resetValue: undefined
        });
    }

    showForm(formName) {
        const {onDisplay, inStorage} = this.props;
        const formValue = formName === DISPLAY_FORM ? onDisplay : inStorage;
        this.setState({
            showForm: formName,
            formValue: formValue,
            resetValue: formValue
        });
    }

    handleFormValueChange(evt) {
        this.setState({
            formValue: Number(evt.target.value)
        });
    }

    handleFormBlur(elementId) {
        console.log('submitting with ' + this.state.formValue);
        this.setState((prevState, props) => {
            if (this.state.showForm === DISPLAY_FORM) {
                return {onDisplay: prevState.formValue};
            } else {
                updateElementQuantityInStorage(prevState.formValue, elementId);
                return {inStorage: prevState.formValue};
            }
        });
        this.hideForm();
    }

    render() {
        return (
            <ElementListItem onFormValueChange={this.handleFormValueChange}
                             onFormBlur={this.handleFormBlur}
                             showForm={this.showForm}
                             displayFormType={DISPLAY_FORM}
                             storageFormType={STORAGE_FORM}
                             currentForm={this.state.showForm}
                             formValue={this.state.formValue}
                             {...this.props}
                             onDisplay={this.state.onDisplay}
                             inStorage={this.state.inStorage}
            />
        );
    }
}

ElementListItemContainer.propTypes = {
    id: PropTypes.number.isRequired,
    colorId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onDisplay: PropTypes.number.isRequired,
    inStorage: PropTypes.number.isRequired
};

export const mapStateToProps = state => {
    return {}
};

export default connect(mapStateToProps)(ElementListItemContainer);