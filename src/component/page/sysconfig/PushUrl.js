import React from 'react'
import {
  Table, Divider, Row, Col, message, Button
} from 'antd';
import UrlSelect from '@src/component/page/url/urlSelector'
import { getUrlInfo, removeUrl, addUrl } from './api';
import update from 'immutability-helper';


//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class PushUrl extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    objectTitle: "选择url",
    data: [],
    selectedData: []
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  getUrlInfo = () => {
    let self = this;
    getUrlInfo({}, function (data) {
      let urlData = [];
      for (var i = 0; i < data.dataList.length; i++) {
        urlData.push(data.dataList[i].urlEntity);
      }
      self.setState({
        data: data.dataList,
        selectedData: urlData
      })
    });
  }

  onRemove = async (id) => {
    let self = this;
    await removeUrl({ "id": id }, function (data) {
      message.info("删除成功");
    });
    self.getUrlInfo();
  }

  onDetail = (id) => {
    debugger
    this.props.history.push("/page/url/addUrl/" + id + "/detail");
  }

  onSelect = () => {
    this.setState({
      visible: true,
    });
    this.child.handleSearch();
  }

  handleOK = async (dataList) => {
    let result = update(this.state.data, { $push: dataList });
    let self = this;
    await addUrl(result, function (data) {
      message.info("增加成功")
    });
    self.setState({ visible: false });
    self.getUrlInfo();

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  onRef = (child) => {
    this.child = child;
  }

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'urlEntity.name',
        key: 'urlEntity.name',
        render: (text, record) => <a href="javascript:;" onClick={this.onDetail.bind(this, record.urlEntity.id)}>{text}</a>,
      },
      {
        title: '地址',
        dataIndex: 'urlEntity.url',
        key: 'urlEntity.url',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onRemove.bind(this, record.id)}>删除</a>
          </span >
        ),
      },
    ];

    return (
      <div>
        <Row>
          <Col span={4}>
            <Button type="primary" onClick={this.onSelect.bind(this)}>新增URL</Button>
          </Col>
        </Row>
        <Table dataSource={this.state.data} columns={columns} />
        <UrlSelect onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.selectedData} />
      </div >
    );
  }
}
export default PushUrl