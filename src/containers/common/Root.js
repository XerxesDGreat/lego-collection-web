import React from 'react';
import configureStore from '../../configureStore';
import AppContainer from './AppContainer';
import {Provider} from 'react-redux';

const store = configureStore();



export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}