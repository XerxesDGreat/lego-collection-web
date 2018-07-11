import React from 'react';
import PropTypes from 'prop-types';

const getSumOfElements = (elementList, key) => {
    if (elementList === undefined || elementList.length === 0) {
        return 0;
    }

    return elementList.reduce((carry, item) => carry + (key in item ? item[key] : 0), 0);
};

const PartModal = props => {
    const {part, modalName, onClose} = props;
    return (
        <div className="modal fade" id={modalName} tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                {part && (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{part.name}</h5>
                        <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <img src={part.thumbnail_url} alt={"Image for " + part.part_num} />
                                </div>
                            </div>
                            <div className="row">
                                Part num: {part.part_num}
                            </div>
                            <div className="row">
                                Category id: {part.category}
                            </div>
                            <div className="row">
                                In storage: {getSumOfElements(part.owned_elements, 'quantity_in_storage')}
                            </div>
                            <div className="row">
                                On display: {getSumOfElements(part.owned_elements, 'quantity_on_display')}
                            </div>
                            <div className="row">
                                <div className="card card-body">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

PartModal.propTypes = {
    part: PropTypes.shape({
        name: PropTypes.string.isRequired
    }),
    modalName: PropTypes.string.isRequired
};

export default PartModal;