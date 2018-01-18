import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      genres: []
    }
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
  renderGenreLink (genre) {
    return (
      <span className="mr-1" key={genre}>
        <Link to={`/series/${genre}`} className="badge badge-primary">{genre} </Link>
      </span>
    )
  }
  render () {
    return (
      <section className="home mt-4">
        <h2>Bem-vindo!</h2>
        <p>Escolha um gênero para ver suas séries.</p>
        <div>
          {
            this.state.isLoading &&
            <span>Carregando...</span>
          }
        </div>

        <div>
          {
            !this.state.isLoading &&
            <div>
              {
                this.state.genres.map(this.renderGenreLink)
              }
            </div>
          }
        </div>
      </section>
    )
  }
}

export default Home
