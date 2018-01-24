import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import api from './Api'

const statuses = ['Assistido', 'Assistindo', 'Assistir']

class EditSeries extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      redirect: false,
      genres: [],
      series: {}
    }

    this.saveSeries = this.saveSeries.bind(this)
  }
  componentDidMount () {
    this.setState({ isLoading: true })
    api.loadSerieById(this.props.match.params.id)
      .then(res => {
        this.setState({ series: res.data })
        this.refs.name.value = this.state.series.name
        this.refs.status.value = this.state.series.status
        this.refs.genre.value = this.state.series.genre
        this.refs.comments.value = this.state.series.comments
      })
    api.loadGenres()
      .then(res => {
        this.setState({
          isLoading: false,
          genres: res.data
        })
      })
  }

  saveSeries () {
    const series = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }
    api.updateSeries(series).then((res) => {
      this.setState({
        redirect: `/series/${this.refs.genre.value}`
      })
    })
  }

  render () {
    return (
      <section className="new-serie mt-4">
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <h2>Editar série</h2>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input className="form-control" ref="name" type="text" id="name" name="name" placeholder="Nome da Série"/>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select className="form-control" ref="status" id="status">
            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Gênero</label>
          <select className="form-control" ref="genre" id="genre">
            {this.state.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comentários</label>
          <textarea className="form-control" ref="comments" name="comments" id="comments" cols="30" rows="4" placeholder="Escreva um comentário..."></textarea>
        </div>
        <Link to={`/series/${this.state.series.genre}`} className="btn btn-light mr-1">Cancelar</Link>
        <button className="btn btn-primary" type="button" onClick={this.saveSeries}>Salvar</button>
      </section>
    )
  }
}

export default EditSeries
