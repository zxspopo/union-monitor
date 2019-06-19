import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addZK(params, callback) {
  let response = await axios.post(url.ZK_ADD, params);
  onResponse(response, callback);
}

export async function listZK(params, success) {
  let response = await axios.get(url.ZK_LIST, { params: params });
  onResponse(response, success)
}

export async function removeZK(params, success) {
  let response = await axios.get(url.ZK_DELETE, { params: params });
  onResponse(response, success)
}
