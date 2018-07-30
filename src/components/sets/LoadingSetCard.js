import React from 'react';
import {getBaseUrl} from '../../config';

export const loadingImg = getBaseUrl() + "lego-loading.gif";

const LoadingSetCard = props => (
    <div className="card mx-1 my-1"
         key={props.set_num}
         style={{float: "left", width: 140, minHeight: 220}}
    >
        <img className="card-img-top align-middle"
             src={loadingImg}
             alt='loading'
             style={{maxHeight: 220, objectFit: "contain"}}
        />
    </div>
);

export default LoadingSetCard;

