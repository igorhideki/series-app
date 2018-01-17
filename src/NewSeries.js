import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = ['Watched', 'Watching', 'To watch']

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
      <section>
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <h2>New Serie</h2>
        <div>
          <label htmlFor="name">Name: </label>
        </div>
        <input ref="name" type="text" id="name" placeholder="Name"/>
        <br/>
        <div>
          <label htmlFor="status">Status: </label>
        </div>
        <select ref="status" id="status" placeholder="Status">
          { statuses.map(status => <option key={ status } value={ status }>{ status }</option>) }
        </select>
        <br/>
        <div>
          <label htmlFor="genre">Genre: </label>
        </div>
        <select ref="genre" id="genre" placeholder="Genre">
          { this.state.genres.map(genre => <option key={ genre } value={ genre }>{ genre }</option>) }
        </select>
        <br/>
        <div>
          <label htmlFor="coments">Coments: </label>
        </div>
        <textarea ref="coments" name="coments" id="coments" cols="30" rows="10"></textarea>
        <br/>
        <button type="button" onClick={ this.saveSeries }>Salvar</button>
      </section>
    )
  }
}

export default NewSeries
