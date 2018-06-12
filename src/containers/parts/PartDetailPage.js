import React from 'react';
import {fetchPartById} from "../../modules/currentPart";
import {connect} from "react-redux";
import PartDetail from "../../components/parts/PartDetail";

class PartDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, match} = this.props;
        dispatch(fetchPartById(match.params.id));
    }

    render() {
        return (
            <PartDetail part={this.props.part}>
            </PartDetail>
        );
    }
}

const mapStateToProps = state => {
    // if we want to filter, this is where we can do it
    return {
        part: state.parts.currentPart.part,
        isFetching: state.parts.currentPart.isFetching
    }
};

export default connect(mapStateToProps)(PartDetailPage);