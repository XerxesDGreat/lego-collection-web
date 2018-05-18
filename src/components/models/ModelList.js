import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function getElementsForModels(models) {
    const modelElements = [];
    for (let i in models) {
        const model = models[i];
        modelElements.push(
            <div className="card my-1 mx-1" key={model.num}>
                <div style={{height: 200, display: "inline-block", align: "center"}}>
                    <img className="card-img-top align-middle"
                         src={'https://images.brickset.com/sets/small/' + model.num + '.jpg'}
                         alt={'Image for ' + model.num}
                         style={{maxHeight: 200, objectFit: "contain"}}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={"/models/" + model.num}>{model.num}</Link>
                    </h5>
                    <p className="card-text">{model.name}</p>
                </div>
                <div className="card-footer">
                    <Link to={"/models/" + model.num} className="btn btn-outline-primary">Details</Link>
                </div>
            </div>
        );
    }
    return modelElements;
}

const ModelList = ({models}) => {
    return (
        <div className="card-deck">
            {getElementsForModels(models)}
        </div>
    );
};

ModelList.propTypes = {
    models: PropTypes.array.isRequired
};

export default ModelList;