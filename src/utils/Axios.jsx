import axios from "axios"

let baseURL = "https://youtube-v31.p.rapidapi.com/"

const http = axios.create({
  baseURL,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
})

http.interceptors.response.use(
  (response) => {
    return response.data.items
  },
  (error) => {
    Promise.reject(error)
  }
)

export default http
