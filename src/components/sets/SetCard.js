import React from 'react';
import PropTypes from 'prop-types';
import {getBaseUrl, routes} from '../../config';

const getImgClass = thumbnailUrl => {
    const detail = thumbnailUrl ? 'border-primary' : 'border-danger';
    return 'mx-1 my-1 border ' + detail;
};

export const imgUrlTemplate = getBaseUrl() + '/lego-placeholder.jpg';

export const getImageUrlForSet = (thumbnailUrl, setNum) => {
    return !thumbnailUrl ? imgUrlTemplate.replace('__set_num__', setNum) : thumbnailUrl;
};

export const getPartDetailLinkUrl = partNum => routes.partDetail.replace(':id', partNum);

const getOwnedCount = elements => {
    if (!elements) return 0;
    return elements.reduce((total, e) => total + e.quantity_on_display + e.quantity_in_storage, 0);
};

const SetCard = props => {
    const {set/*, onPartCardClick, modalName*/} = props;
    const {set_num, image_url, name, theme, year} = set;
    return (
        <div className="card mx-1 my-1"
             style={{float: "left", width: 140, minHeight: 220}}
             /*onClick={onPartCardClick}
             data-toggle="modal"
             data-target={'#' + modalName}*/
        >
            <div className={getImgClass(image_url)} style={{display: "inline-block", align: "center"}}>
                <img className="card-img-top align-middle"
                     src={getImageUrlForSet(image_url, set_num)}
                     alt={'Image for ' + set_num}
                     style={{maxHeight: 100, objectFit: "contain"}}
                />
            </div>
            <div className="card-body px-1 py-1">
                <h5 className="card-title text-center">{set_num}</h5>
                <p className="card-text">
                    Year: {year}<br />
                    Theme: {theme}
                </p>
            </div>
        </div>
    );
};

SetCard.propTypes = {
    set: PropTypes.shape({
        set_num: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        year: PropTypes.number.isRequired,
        //owned_elements: PropTypes.array,
        theme: PropTypes.number.isRequired
    }).isRequired,
    // modalName: PropTypes.string.isRequired,
    // onPartCardClick: PropTypes.func.isRequired
};

export default SetCard;

