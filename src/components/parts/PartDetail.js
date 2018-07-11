import React from 'react';
import PropTypes from 'prop-types';

const PartDetail = props => (
    props.part === undefined ?
        "" :
        <div>
            <div style={{float: "left"}}>
                <img src={props.part.thumbnail_url}
                     alt={"Image for " + props.part.part_num} />
            </div>
            <div>
                <div>{props.part.part_num} - {props.part.name}</div>
                {props.children}
            </div>
        </div>
);

PartDetail.propTypes = {
    part: PropTypes.shape({
        part_num: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.number.isRequired,
        thumbnail_url: PropTypes.string.isRequired
    })
};

export default PartDetail;