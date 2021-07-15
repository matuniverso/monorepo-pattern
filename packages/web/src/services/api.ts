import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'XSRF-TOKEN': csrf, 'AUTH-TOKEN': token } = parseCookies()

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000'
})

if (!csrf) {
  api.get('/sanctum/csrf-cookie')
}

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
