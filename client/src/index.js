import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import ru from "react-intl/locale-data/ru"
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationHeader from './utils/setAuthorizationHeader'
import {localeSet} from "./actions/locale";
import {fetchCurrentUser, userFetched} from "./actions/users";

addLocaleData(en);
addLocaleData(ru);

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.alhubJWT) {
    setAuthorizationHeader(localStorage.alhubJWT);
    store.dispatch(fetchCurrentUser());
}else {
    store.dispatch(userFetched({}));
}

if (localStorage.alhubLang) {
    store.dispatch(localeSet(localStorage.alhubLang));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
