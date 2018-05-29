import React from 'react';
import {connect} from 'react-redux';
import {fetchParts} from '../../actions/partActions';
import PartList from '../../components/parts/PartList';

class PartListContainer extends React.Component {
    componentDidMount() {
        const {dispatch, categoryId} = this.props;
        dispatch(fetchParts({categoryId}));
    }

    render() {
        if (this.props.parts.length < 1) {
            return "nothing";
        }
        return (
            <PartList parts={this.props.parts} />
        )
    }
}

const mapStateToProps = state => {
    return {
        parts: state.parts.items
    };
};

export default connect(mapStateToProps)(PartListContainer);