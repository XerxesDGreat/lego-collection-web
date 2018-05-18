import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureRepository from './repository/configureRepository';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './scss/index.css';
import './scss/lego.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./components/App";
import ModelsPage from "./components/models/ModelsPage";
import PartCategoriesPage from "./components/parts/PartCategoriesPage";
import Header from "./components/common/Header";
import ModelPage from "./components/models/ModelPage";
import {loadModels} from "./actions/modelActions";
import {loadPartCategories} from "./actions/partActions";

const repository = configureRepository();

repository.dispatch(loadModels());
repository.dispatch(loadPartCategories());

render(
    <Provider store={repository}>
        <BrowserRouter>
            <div>
                <Header/>
                <div className="detailContainer">
                    <div className="container">
                        <Route exact path="/" component={App} />
                        <Route exact path="/models" component={ModelsPage} />
                        <Route path="/models/:id" component={ModelPage} />
                        <Route exact path="/parts" component={PartCategoriesPage} />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
