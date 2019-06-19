import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Divider } from 'antd';
import { listUrl, removeUrl, onTest } from './api';

const confirm = Modal.confirm;
const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class List extends React.Component {

  state = {
    pagination: {},
    data: [],
    visible: false
  };

  componentDidMount() {
    this.onSearch();
  }

  onSearch = (value = "") => {
    let self = this;
    listUrl({
      "keyword": value,
      "current": this.state.pagination.current
    }, [], function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onModify = (id) => {
    this.props.history.push("/page/url/addUrl/" + id + "/modify");
  }

  onDetail = (id) => {
    this.props.history.push("/page/url/addUrl/" + id + "/detail");
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeUrl({ "id": id }, function (data) {
          message.info("删除成功!");
          self.onSearch();
        });
      },
      onCancel() { },
    });
  }

  addUrl = () => {
    this.props.history.push("/page/url/addUrl")
  }

  onTest = (id) => {
    let self = this;
    onTest({ "id": id }, function (data) {
      self.setState({
        visible: true,
        testResult: data.dataList[0]
      })
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
      testResult: {}
    })
  }

  render() {


    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href="javascript:;" onClick={this.onDetail.bind(this, record.id)}>{text}</a>,
      },
      {
        title: '地址',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '请求方式',
        dataIndex: 'method',
        key: 'method',
        render: (text, record) => record.method == '1' ? "GET" : "POST",
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onModify.bind(this, record.id)}>修改</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.onRemove.bind(this, record.id)}>删除</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.onTest.bind(this, record.id)}>测试</a>
          </span>
        ),
      },
    ];


    return (
      <div>
        <Row>
          <Col span={8}>
            <Search placeholder="input search text" onSearch={value => this.onSearch(value)} enterButton />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.addUrl.bind(this)}>新增</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
        <Modal
          title="测试结果"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          destroyOnClose={true}
        >
          <div style={{ height: 400, overflow: "auto" }}>{JSON.stringify(this.state.testResult, "\t")}</div>

        </Modal>
      </div>
    );
  }
}
export default withRouter(List)