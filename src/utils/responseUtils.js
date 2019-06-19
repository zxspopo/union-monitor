
import { message } from 'antd';
export function parseResponse(response) {

  let success = response.success == 'success';
  let errorMsg = response.message;
  let dataList = response.detailMsg.data ? response.detailMsg.data.content : [];
  let current = response.detailMsg.data ? response.detailMsg.data.number : 0;
  let totalCount = response.detailMsg.data ? response.detailMsg.data.totalElements : 0;
  return {
    success: success,
    errorMsg: errorMsg,
    dataList: dataList,
    pagination: {
      current: current,
      total: totalCount
    }
  }
}

export function onResponse(response, success = null, failure = null) {
  if (response.success) {
    if (success) {
      success(response);
    } else {
      message.info("操作成功!");
    }
  } else {
    if (failure) {
      failure(response);
    } else {
      message.error("操作出现错误!具体原因是" + response.errorMsg);
    }
  }
}