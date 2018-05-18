import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ModelList from './ModelList';

class ModelsPage extends React.Component {
    render() {
        const models = this.props.models;
        return (
            <div>
                <ModelList models={models} />
            </div>
        );
    }
}

ModelsPage.propTypes = {
    models: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        models: state.models
    }
}

export default connect(mapStateToProps)(ModelsPage);