import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './custom.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

function getEnvironment() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return process.env.REACT_APP_DEV_ENV;
    }
    else {
        return '';//TODO: Define according to Azure's address
    }
}

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
        <App environment={getEnvironment()}
             title={'Photogallery'} />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

