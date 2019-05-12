import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Builder from './components/Builder';

import LCC from 'lightning-container';

ReactDOM.render(
    <App>
        <Builder />
    </App>,
  document.getElementById('app')
);
