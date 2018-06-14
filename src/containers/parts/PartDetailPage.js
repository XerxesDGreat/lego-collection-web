import React from 'react';
import {fetchPartById} from "../../modules/currentPart";
import {connect} from "react-redux";
import PartDetail from "../../components/parts/PartDetail";
import ElementListContainer from '../elements/ElementListContainer';

class PartDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            partNumToRequest: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchPartById(this.state.partNumToRequest));
    }

    render() {
        return (
            <PartDetail part={this.props.part}>
                <ElementListContainer partNum={this.state.partNumToRequest}/>
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