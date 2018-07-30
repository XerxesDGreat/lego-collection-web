import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SetCard from '../../components/sets/SetCard';
import LoadingSetCard from '../../components/sets/LoadingSetCard';
import {getSingleSet} from "../../modules/sets";

export class SetCardContainer extends React.Component {
    constructor(props) {
        super(props);

        //this.onPartCardClick = this.onPartCardClick.bind(this);
    }

    componentDidMount() {
        const {set, setNum, dispatch, getSingleSet} = this.props;
        if (set === undefined) {
            dispatch(getSingleSet(setNum))
        }
    }

    // onPartCardClick() {
    //     const {part, onPartCardClick} = this.props;
    //     onPartCardClick(part);
    // }

    render() {
        const {set/*, modalName*/} = this.props;
        return set !== undefined ?
            <SetCard set={set}
                      /*onPartCardClick={this.onPartCardClick}
                      modalName={modalName}*/
            /> :
            <LoadingSetCard/>
    }
}

SetCardContainer.propTypes = {
    getSingleSet: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    setNum: PropTypes.string.isRequired,
    set: PropTypes.object, // we'll leave the details up to
    // onPartCardClick: PropTypes.func.isRequired,
    // modalName: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        getSingleSet
    };
};

export default connect(mapStateToProps)(SetCardContainer);