import React from 'react';
import PropTypes from 'prop-types';
import {getBaseUrl, routes} from '../../config';

const getImgClass = thumbnailUrl => {
    const detail = thumbnailUrl ? 'border-primary' : 'border-danger';
    return 'mx-1 my-1 border ' + detail;
};

export const imgUrlTemplate = getBaseUrl() + '/lego-placeholder.jpg';

export const getImageUrlForPart = (thumbnailUrl, partNum) => {
    return !thumbnailUrl ? imgUrlTemplate.replace('__part_num__', partNum) : thumbnailUrl;
};

export const getPartDetailLinkUrl = partNum => routes.partDetail.replace(':id', partNum);

const getOwnedCount = elements => {
    if (!elements) return 0;
    return elements.reduce((total, e) => total + e.quantity_on_display + e.quantity_in_storage, 0);
};

const PartCard = props => {
    const {part, onPartCardClick, modalName} = props;
    const {part_num, thumbnail_url, owned_elements, colors} = part;
    return (
        <div className="card mx-1 my-1"
             key={part_num}
             style={{float: "left", width: 140, minHeight: 220}}
             onClick={onPartCardClick}
             data-toggle="modal"
             data-target={'#' + modalName}
        >
            <div className={getImgClass(thumbnail_url)} style={{display: "inline-block", align: "center"}}>
                <img className="card-img-top align-middle"
                     src={getImageUrlForPart(thumbnail_url, part_num)}
                     alt={'Image for ' + part_num}
                     style={{maxHeight: 100, objectFit: "contain"}}
                />
            </div>
            <div className="card-body px-1 py-1">
                <h5 className="card-title text-center">{part_num}</h5>
                <p className="card-text">
                    Colors: {colors.length}<br />
                    Owned: {getOwnedCount(owned_elements)}
                </p>
            </div>
        </div>
    );
};

PartCard.propTypes = {
    part: PropTypes.shape({
        part_num: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        category: PropTypes.number.isRequired,
        owned_elements: PropTypes.array,
        colors: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    modalName: PropTypes.string.isRequired,
    onPartCardClick: PropTypes.func.isRequired
};

export default PartCard;

