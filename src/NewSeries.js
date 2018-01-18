import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = ['Assistido', 'Assistindo', 'Assistir']

class NewSeries extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      redirect: false,
      genres: []
    }

    this.saveSeries = this.saveSeries.bind(this)
  }
  componentDidMount () {
    this.setState({ isLoading: true })
    api.loadGenres()
      .then(res => {
        this.setState({
          isLoading: false,
          genres: res.data
        })
      })
  }

  saveSeries () {
    const newSerie = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      coments: this.refs.coments.value
    }
    api.saveSeries(newSerie).then((res) => {
      this.setState({
        redirect: `series/${this.refs.genre.value}`
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
        <h2>Nova série</h2>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input className="form-control" ref="name" type="text" id="name" placeholder="Nome da Série"/>
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
          <label htmlFor="coments">Comentários</label>
          <textarea className="form-control" ref="coments" name="coments" id="coments" cols="30" rows="4" placeholder="Escreva um comentário..."></textarea>
        </div>
        <button className="btn btn-primary" type="button" onClick={this.saveSeries}>Salvar</button>
      </section>
    )
  }
}

export default NewSeries
