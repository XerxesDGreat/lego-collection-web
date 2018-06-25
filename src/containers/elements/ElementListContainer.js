import React from 'react';
import {connect} from 'react-redux';
import {fetchElementsForPart, getElementsForPart} from '../../modules/elements';
import ElementList from '../../components/elements/ElementList';

export class ElementListContainer extends React.Component {
    componentDidMount() {
        const {dispatch, partNum} = this.props;
        dispatch(fetchElementsForPart(partNum));
    }

    render() {
        return <ElementList {...this.props} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentState = state.elements.elementsForPart[ownProps.partNum];
    return {
        loading: currentState !== undefined ? currentState.loading : true,
        elements: getElementsForPart(state, ownProps.partNum)
    }
};

export default connect(mapStateToProps)(ElementListContainer);
