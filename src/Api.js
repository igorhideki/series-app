import axios from 'axios'

const base = 'http://localhost:3001/'
const api = axios.create({
  baseURL: base
})
const apis = {
  loadGenres: () => api.get('genres'),
  saveSeries: (newSerie) => api.post('series', newSerie),
  loadSerieGenre: (genre) => api.get(`series?genre=${genre}`),
  deleteSeries: (id) => api.delete(`series/${id}`)
}

export default apis
