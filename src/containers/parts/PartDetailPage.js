import React from 'react';
import {fetchPartById} from "../../modules/currentPart";
import {connect} from "react-redux";
import PartDetail from "../../components/parts/PartDetail";
import ElementListContainer from '../elements/ElementListContainer';
import PropTypes from 'prop-types';

export class PartDetailPage extends React.Component {
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

PartDetailPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
    isFetching: PropTypes.bool.isRequired,
    part: PropTypes.object
};


const mapStateToProps = state => {
    // if we want to filter, this is where we can do it
    return {
        part: state.parts.currentPart.part,
        isFetching: state.parts.currentPart.isFetching
    }
};

export default connect(mapStateToProps)(PartDetailPage);