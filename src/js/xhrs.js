import axios from 'axios'
import qs from 'qs'
import Util from './util/util'

/* configure: request with cookies */
axios.defaults.withCredentials = true

const isDev = false

// 是否为测试环境, true请求测试接口, false请求正式接口
const isTest = Util.getParams().test ? true : false

const apis = {
  getRewards: isTest ? 
    'http://www.baidu.com' 
    : 'http://www.baidu.com',
  collect: isTest ? 
    'http://www.baidu.com'
    : 'http://www.baidu.com'
}

const xhrs = {
  getRewards(params) {
    return new Promise((resolve, reject) => {
      axios.post(isDev ? 'new-year-lucky-draw' : apis.getRewards, 
        qs.stringify(params)
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    }) 
  },

  collect(params) {
    return new Promise((resolve, reject) => {
      axios.get(apis.collect, {params})
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

}

export default xhrs