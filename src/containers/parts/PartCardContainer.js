import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PartCard from '../../components/parts/PartCard';
import LoadingPartCard from '../../components/parts/LoadingPartCard';
import {getSinglePart} from "../../modules/parts";

export class PartCardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onPartCardClick = this.onPartCardClick.bind(this);
    }

    componentDidMount() {
        const {part, partNum, dispatch, getSinglePart} = this.props;
        if (part === undefined) {
            dispatch(getSinglePart(partNum))
        }
    }

    onPartCardClick() {
        const {part, onPartCardClick} = this.props;
        onPartCardClick(part);
    }

    render() {
        const {part, modalName} = this.props;
        return part !== undefined ?
            <PartCard part={part}
                      onPartCardClick={this.onPartCardClick}
                      modalName={modalName}
            /> :
            <LoadingPartCard/>
    }
}

PartCardContainer.propTypes = {
    getSinglePart: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    partNum: PropTypes.string.isRequired,
    part: PropTypes.shape({
        part_num: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbnail_url: PropTypes.string.isRequired,
        category: PropTypes.number.isRequired,
        owned_elements: PropTypes.array,
        colors: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    onPartCardClick: PropTypes.func.isRequired,
    modalName: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        getSinglePart
    };
};

export default connect(mapStateToProps)(PartCardContainer);