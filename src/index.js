import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './containers/common/Root';
import './scss/index.css';
import './scss/lego.css';

render (
    <Root />,
    document.getElementById('root')
);
registerServiceWorker();
