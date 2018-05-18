import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Breadcrumbs from '../common/Breadcrumbs';

class ModelPage extends React.Component {
    render() {
        const modelName = this.props.model.name;
        const menuItems = {
            "Home": "/",
            "Models": "/models"
        };
        menuItems[modelName] = null;
        return (
            <div>
                <Breadcrumbs menuItems={menuItems} />
                <h1>{this.props.model.num + " - " + this.props.model.name}</h1>
                <div>
                    <img src={'https://images.brickset.com/sets/large/' + this.props.model.num + '.jpg'}
                         className="img-fluid"
                         alt={"Set image for " + this.props.model.num} />
                </div>
            </div>
        );
    }
}

ModelPage.propTypes = {
    model: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let model={name: '', num: '', numParts: 0, onDisplay: false, quantityOwned: 0, themeId: null, year: null};
    const modelNum = ownProps.match.params.id;
    if (state.models.length > 0) {
        model = Object.assign({}, state.models.find(model => model.num === modelNum));
    }
    return {model: model};
}

export default connect(mapStateToProps)(ModelPage);