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
      <div className="col-md-4">
        <div className="card mb-4 bg-light">
          <div className="card-body">
            <h5 className="card-title">{series.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Status: {series.status} / Genero: {series.genre}</h6>
            <p className="card-text">{series.comments}</p>
            <button onClick={ () => this.deleteSeries(series.id) } className="btn btn-danger btn-sm" >Delete</button>
          </div>
        </div>
      </div>
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
        <div className="row">
          { !this.setState.isLoading && this.state.series.map(this.renderSerieGenre) }
        </div>
      </div>
    )
  }
}

export default Series
