import axios from 'axios'

// npm run dev 开发 /api/v1/me vite-plugin-mock插件会自动找到mock目录下mock的路径
// npm run build 上线 http://121.196.236.94:8080/api/v1
axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => { },
  delete: () => { },
}
