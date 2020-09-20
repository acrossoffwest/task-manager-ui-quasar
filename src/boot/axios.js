import Vue from 'vue'
import axios from 'axios'

if (process.env.NODE_ENV !== 'development' && process.env.MODE === 'electron') {
  const axiosInstance = axios.create({
    baseURL: JSON.parse(process.env.VUE_APP_API_BASE_URL_PROD)
  })
  console.log(axiosInstance.defaults)
  Vue.prototype.$axios = axiosInstance
} else {
  Vue.prototype.$axios = axios
}
