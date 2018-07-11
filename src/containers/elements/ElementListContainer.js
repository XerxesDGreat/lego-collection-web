import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchElementsForPart, getElementsForPart, isLoadingPart} from '../../modules/elements';
import ElementList from '../../components/elements/ElementList';

export class ElementListContainer extends React.Component {
    componentDidMount() {
        const {dispatch, partNum, loading, elements} = this.props;
        if (!loading && elements === undefined) {
            dispatch(fetchElementsForPart(partNum));
        }
    }

    render() {
        const {elements, loading, ownedElements} = this.props;
        return <ElementList elements={elements}
                            loading={loading}
                            ownedElements={ownedElements}
        />
    }
}

ElementListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    partNum: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    elements: PropTypes.array,
    ownedElements: PropTypes.array.isRequired
};

export const mapStateToProps = (state, ownProps) => {
    const {partNum} = ownProps;
    return {
        loading: isLoadingPart(state, partNum),
        elements: getElementsForPart(state, partNum)
    }
};

export default connect(mapStateToProps)(ElementListContainer);
