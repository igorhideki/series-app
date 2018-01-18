import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import NewSeries from './NewSeries'
import Series from './Series'

const About = () => {
  return (
    <section className="sobre mt-4">
      <h2>Sobre</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, quae!</p>
    </section>
  )
}

class App extends Component {
  render () {
    return (
      <Router>
        <Fragment>
          <Nav />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/series/:genre" component={Series} />
            <Route exact path="/new-series" component={NewSeries} />
            <Route exact path="/about" component={About} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App
