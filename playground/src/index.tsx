import React from 'react';
import ReactDOM from 'react-dom';

import Playground from './Playground';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@kyma-project/asyncapi-react/lib/styles/fiori.css';
import './common/icons';

ReactDOM.render(<Playground />, document.getElementById('root'));
