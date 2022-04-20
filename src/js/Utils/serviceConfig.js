import Axios from 'axios'
import Config from '@/../public/config.json'
import Storage from '@/js/Utils/Storage'

export const api = Axios.create({
    baseURL: Config[process.env.NODE_ENV].endpoint,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    }
})

let token = Storage.get('user', 'token')
if (token) api.defaults.headers.common['Authorization'] = token

export default api;