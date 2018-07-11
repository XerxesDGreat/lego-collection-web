import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PartModal from '../../components/parts/PartModal';
import ElementListContainer from '../elements/ElementListContainer';

export class PartModalContainer extends React.Component {
    getElementListContainer() {
        const {part} = this.props;
        return part ?
            (
                <ElementListContainer partNum={part.part_num}
                                      ownedElements={part.owned_elements !== undefined ? part.owned_elements : []} />
            ) : null;
    }

    render() {
        const {modalName, part, onClose} = this.props;
        return <PartModal modalName={modalName}
                          part={part}
                          onClose={onClose}>
            {this.getElementListContainer()}
        </PartModal>
    }
}

PartModalContainer.propTypes = {
    part: PropTypes.object,
    modalName: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export const mapStateToProps = (state, ownProps) => {
    return {
    }
};

export default connect(mapStateToProps)(PartModalContainer);

