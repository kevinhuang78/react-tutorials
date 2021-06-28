import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import Translator from 'bazinga-translator'
import translations_en from './translations/moongano/en.json'
import translations_fr from './translations/moongano/fr.json'
import translations_zh from './translations/moongano/zh.json'

var config = {"defaultDomain": "moongano"};
Translator.fromJSON(config);
Translator.fromJSON(translations_en);
Translator.fromJSON(translations_fr);
Translator.fromJSON(translations_zh);

export const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
);

// Check if the script is already in the DOM or not
const existingScript = document.getElementById('jiraMoongano');

// Include Jira JS script to report bugs only in testing server
if (process.env.REACT_APP_MOONGANO_JIRA_REPORT === "true" && !existingScript) {
    const script = document.createElement("script");
    script.src = "https://moongano.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-wke80k/b/51/a44af77267a987a660377e5c46e0fb64/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=fr-FR&collectorId=3c07d4d5";
    script.async = true;
    script.id = 'jiraMoongano';

    document.body.appendChild(script);
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);