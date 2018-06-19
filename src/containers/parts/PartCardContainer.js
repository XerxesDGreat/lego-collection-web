import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PartCard from '../../components/parts/PartCard';
import LoadingPartCard from '../../components/parts/LoadingPartCard';
import {getSinglePart} from "../../modules/parts";

export class PartCardContainer extends React.Component {
    componentDidMount() {
        const {part, partNum, dispatch, getSinglePart} = this.props;
        if (part === undefined) {
            dispatch(getSinglePart(partNum))
        }
    }

    render() {
        const {part} = this.props;
        return part !== undefined ?
            <PartCard partNum={part.part_num} name={part.name} thumbnailUrl={part.thumbnail_url} /> :
            <LoadingPartCard/>
    }
}

PartCardContainer.propTypes = {
    getSinglePart: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    partNum: PropTypes.string.isRequired,
    part: PropTypes.shape({
        part_num: PropTypes.string,
        name: PropTypes.string,
        thumbnail_url: PropTypes.string
    })
};

const mapStateToProps = (state, ownProps) => {
    return {
        getSinglePart
    };
};

export default connect(mapStateToProps)(PartCardContainer);