import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getBaseUrl, routes} from '../../config';

const getImgClass = props => {
    const detail = props.thumbnailUrl ? 'border-primary' : 'border-danger';
    return 'mx-1 my-1 border ' + detail;
};

export const imgUrlTemplate = getBaseUrl() + '/lego-placeholder.jpg';

export const getImageUrlForPart = props => {
    return !props.thumbnailUrl ? imgUrlTemplate.replace('__part_num__', props.partNum) : props.thumbnailUrl;
};

export const getPartDetailLinkUrl = props => routes.partDetail.replace(':id', props.partNum);

const PartCard = props => (
    <div className="card mx-1 my-1"
         key={props.partNum}
         style={{float: "left", width: 140, minHeight: 220}}
    >
        <div className={getImgClass(props)} style={{display: "inline-block", align: "center"}}>
            <img className="card-img-top align-middle"
                 src={getImageUrlForPart(props)}
                 alt={'Image for ' + props.partNum}
                 style={{maxHeight: 100, objectFit: "contain"}}
            />
        </div>
        <div className="card-body px-1 py-1">
            <p className="card-title text-center">
                <Link to={getPartDetailLinkUrl(props)}>{props.partNum}</Link>
            </p>
        </div>
        <div className="card-footer text-center">
            <Link to={getPartDetailLinkUrl(props)}
                  className="btn btn-outline-primary">Details</Link>
        </div>
    </div>
);

PartCard.propTypes = {
    partNum: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string
};

export default PartCard;

