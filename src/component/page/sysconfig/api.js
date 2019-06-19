import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function getMailInfo(params, callback) {
  let response = await axios.get(url.SYSCONF_GET_MAIL, params);
  onResponse(response, callback);
}


export async function modifyMail(params, callback) {
  let response = await axios.post(url.SYSCONF_MODIFY_MAIL, params);
  onResponse(response, callback);
}


export async function getUrlInfo(params, callback) {
  let response = await axios.get(url.SYSCONF_GET_URL, params);
  onResponse(response, callback);
}

export async function removeUrl(params, callback) {
  let response = await axios.get(url.SYSCONF_DELETE_URL, { params: params });
  onResponse(response, callback);
}

export async function addUrl(params, callback) {
  let response = await axios.post(url.SYSCONF_ADD_URL, params);
  onResponse(response, callback);
}


