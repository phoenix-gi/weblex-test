require('../css/styles.css');

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

const Application = require('./application.jsx').Application;

ReactDom.render(
    <Application/>,
    document.getElementById('react-dom-root')
);