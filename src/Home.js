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
      <span key={genre}>&nbsp;<Link to={`/series/${genre}`} className="badge badge-primary">{ genre }&nbsp;</Link></span>
    )
  }
  render () {
    return (
      <section className="home">
        <h2>Bem-vindo!</h2>
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
              Gêneros:
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
