import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
        <Main myTitle={'Photogallery'} />
  </BrowserRouter>,
  rootElement);

//This fixes the Browser's Hot Reload for index.js (see the create-react-app on GitHub for more details)
if (module.hot) {
    module.hot.accept();
}

registerServiceWorker();

