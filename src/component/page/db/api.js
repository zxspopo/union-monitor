import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addDB(params, callback) {
  let response = await axios.post(url.DB_ADD, params);
  onResponse(response, callback);
}

export async function listDB(params, success) {
  let response = await axios.get(url.DB_LIST, { params: params });
  onResponse(response, success)
}

export async function dbDetail(params, success) {
  let response = await axios.get(url.DB_DETAIL, { params: params });
  onResponse(response, success)
}


export async function listDBSql(params, success) {
  let response = await axios({ method: "post", url: url.DB_SQL_LIST, params: params });
  onResponse(response, success)
}

export async function sqlTest(params, success) {
  let response = await axios.get(url.DB_SQL_TEST, { params: params });
  onResponse(response, success)
}

export async function addDbSql(params, callback) {
  let response = await axios.post(url.DB_SQL_ADD, params);
  onResponse(response, callback);
}

export async function listSqlForModal(params, data, success) {
  let response = await axios({ method: "post", url: url.DB_SQL_LIST, params: params, data: data });
  onResponse(response, success)
}


export async function querySqlByIds(params, success) {
  let response = await axios.post(url.DB_SQL_LIST_BY_IDS, params);
  return response;
  // onResponse(response, success)
}

export async function removeSql(params, success) {
  let response = await axios.get(url.DB_SQL_REMOVE_BY_IDS, { params: params });
  onResponse(response, success)
}


export async function removeDb(params, success) {
  let response = await axios.get(url.DB_REMOVE_BY_IDS, { params: params });
  onResponse(response, success)
}


