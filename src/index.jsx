import React from 'react'
import { render } from 'react-dom'

import './assets/css/reset.css'
import './assets/css/styles.scss'
import 'babel-polyfill'

import App from './app.jsx'
import ComicDescAll from './components/all-description-comic/index.jsx'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

render(
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/:id" component={ComicDescAll} />
        </Switch>
    </Router>,
    document.querySelector('[data-js="app"]')
)