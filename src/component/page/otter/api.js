import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addOtter(params, callback) {
  let response = await axios.post(url.OTTER_ADD, params);
  onResponse(response, callback);
}

export async function listOtter(params, success) {
  let response = await axios.get(url.OTTER_LIST, { params: params });
  onResponse(response, success)
}

export async function listChannel(params, success) {
  let response = await axios({ url: url.OTTER_CHANNEL_LIST, method: "post", data: [], params: params });
  onResponse(response, success)
}


export async function addChannel(params, success) {
  let response = await axios.post(url.OTTER_CHANNEL_ADD, params);
  onResponse(response, success)
}

export async function listChannelForModal(params, data, success) {
  let response = await axios({ url: url.OTTER_CHANNEL_LIST, method: "post", data: data, params: params });
  onResponse(response, success)
}

export async function getChannelByIds(params, success) {
  let response = await axios.post(url.OTTER_CHANNEL_LIST_BY_IDS, params);
  return response
  // onResponse(response, success)
}

export async function removeOtter(params, success) {
  let response = await axios.get(url.OTTER_DELETE, { params: params });
  onResponse(response, success)
}

export async function removeChannel(params, success) {
  let response = await axios.get(url.OTTER_CHANNEL_DELETE, { params: params });
  onResponse(response, success)
}

