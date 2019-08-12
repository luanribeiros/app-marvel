import React from 'react'
import { render } from 'react-dom'

import './assets/css/reset.css'
import './assets/css/styles.scss'
import 'babel-polyfill'

import App from './app.jsx'
import Comic from './components/comic/index.jsx'
import AllDescComic from './components/all-description-comic/index.jsx'

import { BrowserRouter, Route } from 'react-router-dom'

render(
    <BrowserRouter>
        <Route path="/" exact component={App} />
        <Route path="/comic" component={Comic} />
        <Route path="/comic/:id" />
    </BrowserRouter>,
    document.querySelector('[data-js="app"]')
)