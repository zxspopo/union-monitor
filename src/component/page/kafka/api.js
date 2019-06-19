import { instance as axios } from '@api/axios';
import { url } from '@api/ServerUrl';
import { onResponse } from '@src/utils/responseUtils';

export async function addKafka(params, callback) {
  let response = await axios.post(url.KAFKA_ADD, params);
  onResponse(response, callback);
}

export async function listKafka(params, success) {
  let response = await axios.get(url.KAFKA_LIST, { params: params });
  onResponse(response, success)
}

export async function kafkaDetail(params, success) {
  let response = await axios.get(url.KAFKA_DETAIL, { params: params });
  onResponse(response, success)
}


export async function listKafkaTopic(params, success) {
  let response = await axios({ method: "post", url: url.KAFKA_TOPIC_LIST, params: params });
  onResponse(response, success)
}

export async function featchTopicOffset(params) {
  let response = await axios.get(url.KAFKA_TOPIC_OFFSET, { params: params });
  return response
}

export async function addKafkaTopic(params, callback) {
  let response = await axios.post(url.KAFKA_TOPIC_ADD, params);
  onResponse(response, callback);
}

export async function listTopicForModal(params, data, success) {
  let response = await axios({ method: "post", url: url.KAFKA_TOPIC_LIST, params: params, data: data });
  onResponse(response, success)
}


export async function getTopicByIds(params, success) {
  let response = await axios.post(url.KAFKA_TOPIC_LIST_BY_IDS, params);
  return response;
  // onResponse(response, success)
}

export async function removeTopic(params, success) {
  let response = await axios.get(url.KAFKA_TOPIC_REMOVE_BY_IDS, { params: params });
  onResponse(response, success)
}


export async function removeKakfa(params, success) {
  let response = await axios.get(url.KAFKA_REMOVE_BY_IDS, { params: params });
  onResponse(response, success)
}


