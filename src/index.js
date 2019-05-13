import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Builder from './components/Builder';

ReactDOM.render(
    <App>
        <Builder />
    </App>,
  document.getElementById('app')
);
