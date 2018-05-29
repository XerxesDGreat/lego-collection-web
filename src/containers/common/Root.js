import React from 'react';
import configureStore from "../../configureStore";
import App from "./App";
import {Provider} from 'react-redux';
import PartsPage from "../parts/PartsPage";
import ModelsPage from "../../components/models/ModelsPage";
import PartCategoriesPage from "../parts/PartCategoriesPage";
import ModelPage from "../../components/models/ModelPage";
import {BrowserRouter, Route} from 'react-router-dom';
import Header from '../../components/common/Header';
import PartDetailPage from '../parts/PartDetailPage';


const store = configureStore();

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <div className="detailContainer">
                            <div className="container">
                                <Route exact path="/" component={App}/>
                                <Route exact path="/models" component={ModelsPage}/>
                                <Route path="/models/:id" component={ModelPage}/>
                                <Route exact path="/part-categories" component={PartCategoriesPage}/>
                                <Route exact path="/parts" component={PartsPage} />
                                <Route path="/parts/:id" component={PartDetailPage}/>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}