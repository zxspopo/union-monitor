import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addUrl(params, callback) {
  let response = await axios.post(url.URL_ADD, params);
  onResponse(response, callback);
}

export async function listUrl(params, data, success) {
  let response = await axios.post(url.URL_LIST, data, { params: params });
  onResponse(response, success)
}


export async function getUrlDetail(params, success) {
  let response = await axios.get(url.URL_DETAIL, { params: params });
  onResponse(response, success)
}

export async function modifyUrl(params, success) {
  let response = await axios.post(url.URL_MODIFY, params);
  onResponse(response, success)
}

export async function getUrlByKeys(params, success) {
  let response = await axios.post(url.URL_GET_BY_IDS, params);
  return response;
  //onResponse(response, success)
}

export async function removeUrl(params, success) {
  let response = await axios.get(url.URL_DELETE, { params: params });
  onResponse(response, success)
}


export async function onTest(params, success) {
  let response = await axios.get(url.URL_TEST, { params: params });
  onResponse(response, success)
}





