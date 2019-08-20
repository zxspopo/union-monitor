import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addMQ(params, callback) {
  let response = await axios.post(url.MQ_ADD, params);
  onResponse(response, callback);
}

export async function listMQ(params,data, success) {
  // let response = await axios.get(url.MQ_LIST, { params: params });
  // onResponse(response, success)
  let response = await axios.post(url.MQ_LIST, data, { params: params });
  onResponse(response, success)
}

export async function removeMQ(params, success) {
  let response = await axios.get(url.MQ_DELETE, { params: params });
  onResponse(response, success)
}


export async function getMQByKeys(params, success) {
  let response = await axios.post(url.MQ_GET_BY_IDS, params);
  return response;
  //onResponse(response, success)
}