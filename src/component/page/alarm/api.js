import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addRule(params, callback) {
  let response = await axios.post(url.RULE_ADD, params);
  onResponse(response, callback);
}

export async function listRules(params, success) {
  let response = await axios.get(url.RULE_LIST, { params: params });
  onResponse(response, success)
}

export async function getRuleDetail(params, success) {
  let response = await axios.get(url.RULE_DETAIL, { params: params });
  onResponse(response, success)
}

export async function addTmpl(params, success) {
  let response = await axios.post(url.RULE_TMPL_ADD, params);
  onResponse(response, success)
}

export async function modifyRule(params, success) {
  let response = await axios.post(url.RULE_MODIFY, params);
  onResponse(response, success)
}

export async function saveRuleObject(params, success) {
  let response = await axios.post(url.RULE_ADD_OBJECT, params);
  onResponse(response, success)
}

export async function removeRule(params, success) {
  let response = await axios.get(url.RULE_DELETE, { params: params });
  onResponse(response, success)
}

