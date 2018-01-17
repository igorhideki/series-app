import React, { Component } from 'react'

import api from './Api'

class Series extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      series: []
    }

    this.renderSerieGenre = this.renderSerieGenre.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  componentDidMount () {
    this.loadData()
  }
  loadData () {
    this.setState({ isLoading: true })
    api.loadSerieGenre(this.props.match.params.genre)
      .then(res => {
        this.setState({
          isLoading: false,
          series: res.data
        })
      })
  }
  deleteSeries (id) {
    api.deleteSeries(id).then((res) => this.loadData())
  }
  renderSerieGenre (series) {
    return (
      <li key={ series.name }>
        <h3>Name: { series.name }</h3>
        <p>Status: { series.status }</p>
        <p>Status: { series.genre }</p>
        <div>
          <button onClick={ () => this.deleteSeries(series.id) }>Delete</button>
        </div>
      </li>
    )
  }
  render () {
    return (
      <div>
        <h2>Series { this.props.match.params.genre }</h2>
        {
          this.state.isLoading &&
          <p>Loading...</p>
        }
        {
          !this.state.isLoading && this.state.series.length === 0 &&
          <p>No results</p>
        }
        <ul>
          { !this.setState.isLoading && this.state.series.map(this.renderSerieGenre) }
        </ul>
      </div>
    )
  }
}

export default Series
