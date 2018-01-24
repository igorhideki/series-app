import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      <div key={series.id} className="col-md-4">
        <div className="card mb-4 bg-dark">
          <img className="card-img-top" src="/assets/images/img.svg" alt={`Imagem da serie ${series.name}`} />
          <div className="card-body">
            <h5 className="card-title">{series.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{series.genre} / {series.status}</h6>
            <p className="card-text">{series.comments}</p>
            <button onClick={() => this.deleteSeries(series.id)} className="btn btn-danger mr-1" >Delete</button>
            <Link to={`/series-edit/${series.id}`} className="btn btn-primary" >Editar</Link>
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <section className="series mt-4">
        <h2>Séries {this.props.match.params.genre}</h2>
        <div className="mb-4">
          <Link to="/">Voltar</Link>
        </div>
        {
          this.state.isLoading &&
          <p>Carregando...</p>
        }
        {
          !this.state.isLoading && this.state.series.length === 0 &&
          <p>Nenhuma série encontrada</p>
        }
        <div className="row">
          {!this.setState.isLoading && this.state.series.map(this.renderSerieGenre)}
        </div>
      </section>
    )
  }
}

export default Series
