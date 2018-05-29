import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const imgUrlTemplate = "http://localhost:8888/static/img/unknown-1/__part_num__.png";
//const imgUrlTemplate = "http://img.lugnet.com/ld/__part_num__.gif";
//const imgUrlTemplate = "https://m.rebrickable.com/media/parts/ldraw/2/__part_num__.png";


function getUrlForPart(part) {
    return !part['thumbnail'] ? imgUrlTemplate.replace('__part_num__', part.part_num) : part['thumbnail'];
}

function getCardForPart(part, onPartClick) {
    // @todo refactor out the css
    let imgClass = "mx-1 my-1 border ";
    if (part['thumbnail']) {
        imgClass += "border-primary";
    } else {
        imgClass += "border-danger";
    }

    return (
        <div className="card mx-1 my-1"
             key={part.part_num}
             style={{float: "left", width: 140, minHeight: 220}}
        >
            <div className={imgClass} style={{display: "inline-block", align: "center"}}>
                <img className="card-img-top align-middle"
                     src={getUrlForPart(part)}
                     alt={'Image for ' + part.part_num}
                     style={{maxHeight: 100, objectFit: "contain"}}
                />
            </div>
            <div className="card-body px-1 py-1">
                <p className="card-title text-center">
                    <Link to={"/parts/" + part.part_num}>{part.part_num}</Link>
                </p>
            </div>
            <div className="card-footer text-center">
                <Link to={"/parts/" + part.part_num} className="btn btn-outline-primary">Details</Link>
            </div>
        </div>
    );
}

const PartList = props => {
    const {parts, onPartCardClick} = props;
    return (
        <div>
            {parts.map(part => getCardForPart(part, onPartCardClick))}
        </div>
    );
};

PartList.propTypes = {
    // can expand this for the shape
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            part_num: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    //onPartCardClick: PropTypes.func.isRequired
};

export default PartList;