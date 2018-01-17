import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import NewSeries from './NewSeries'
import Series from './Series'

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, quae!</p>
    </div>
  )
}

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <h1>Minhas séries</h1>
            <Route exact path="/" component={ Home } />
            <Route path="/series/:genre" component={ Series } />
            <Route exact path="/new-series" component={ NewSeries } />
            <Route exact path="/about" component={ About } />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
