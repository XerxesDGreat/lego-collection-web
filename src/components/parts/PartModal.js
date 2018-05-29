import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

// @todo make this modal happen in the middle of the screen
const PartModal = props => (
    props.part === undefined ?
        "" :
        <Modal show={props.part !== undefined} onHide={props.onCloseClick}>
            <Modal.Header closeButton={true}>
                <Modal.Title>{props.part.partNum}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>{props.part.partName}</h6>
                <img src={props.part.thumbnail}
                     alt={"Picture for " + props.part.partNum}
                     className="img-thumbnail" />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCloseClick}>Close</Button>
            </Modal.Footer>
        </Modal>
);

PartModal.propTypes = {
    part: PropTypes.shape({
        name: PropTypes.string.isRequired,
        partNum: PropTypes.string.isRequired,
        //ownedCount: PropTypes.number.isRequired
    }),
    modalId: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired
};

export default PartModal;