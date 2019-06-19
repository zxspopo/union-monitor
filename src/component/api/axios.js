import axios from 'axios';
import _ from 'lodash';
import { message, Modal } from 'antd';
import { parseResponse } from '@src/utils/responseUtils'

export let instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


// 为了防止服务器错误多处冒出
let serverError = false;

// axios.defaults.timeout = 3000;

instance.interceptors.request.use(
  config => {
    //showFullScreenLoading()
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    console.log(response);
    // let res = response.data;
    if (response.status == '401') {
      history.push('/login');
    }
    if (response.status == '200') {
      // if (res.success == 'success') {
      //   return res.detailMsg.data;
      //   // if (response.config.callback) {
      //   //   handleResponseData(response.config.callback, response.data.detailMsg);
      //   // }
      // } else {
      //   message.error('服务端错误!具体原因是' + res.message);
      // }
      return parseResponse(response.data);
    } else {
      console.info(response);
      message.error("未知错误!");
      return {
        success: false,
        errorMsg: "未知错误!"
      }
    }
    // return response.data;
  },
  error => {
    if (error.response && !serverError) {
      if (error.response.status === 500) {
        serverError = true;
        message.error('服务器错误', () => serverError = false);
      } else if (error.response.status == 404) {
        message.error('客户端请求错误');
      }
    }

    return Promise.reject(error);
  }
);

const request = function (url, params, config, method) {
  return new Promise((resolve, reject) => {
    instance[method](url, params, Object.assign({}, config)).then(response => {
      if (response.data.success === 'success') {
        resolve(response.data)
      } else {
        throw new Error(response.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export const post = (url, data, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      params: params
    }
    ).then(response => {
      if (response.data.success === 'success') {
        resolve(response.data)
      } else {
        throw new Error(response.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export const get = (url, params, config = {}) => {
  // return request(url, params, config, 'get')

  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }
    ).then(response => {
      if (response.data.success === 'success') {
        resolve(response.data)
      } else {
        throw new Error(response.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}





/**
 * 拦截处理actionLevel，SUCCESS与AlEAT处理相似
 * @param  {Object|Boolean}   callback                  拦截配置
 * @param  {Object}                    data
 * @return {Promise}
 */
const handleResponseData = (callback, data) => {

  if (!callback) return;
  const handleFunc = callback;
  if (_.isFunction(handleFunc)) { // 若为函数，直接处理
    handleFunc(data);
  } else { // 若success属性非上三种类型，弹出字符
    message.info("操作成功!")
  }
  return Promise.resolve(data);
};
