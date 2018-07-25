import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from "react-redux";
import store from "./reducers/store";

import moment from 'moment';
import 'moment/locale/he';

moment.locale('he');

ReactDOM.render(<Provider store={store}>
       <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
