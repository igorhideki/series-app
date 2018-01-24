import axios from 'axios'

const base = 'http://localhost:3001/'
const api = axios.create({
  baseURL: base
})
const apis = {
  loadGenres: () => api.get('genres'),
  saveSeries: (newSerie) => api.post('series', newSerie),
  updateSeries: (series) => api.put(`series/${series.id}`, series),
  loadSerieGenre: (genre) => api.get(`series?genre=${genre}`),
  loadSerieId: (id) => api.get(`series?id=${id}`),
  deleteSeries: (id) => api.delete(`series/${id}`),
  loadSerieById: (id) => api.get(`series/${id}`)
}

export default apis
