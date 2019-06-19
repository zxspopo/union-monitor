import { instance as axios } from '../api/axios';

// 获取用户信息
export const getUserInfo = (callback) => axios.get('/monitor-web/api/user/login', callback);


