import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Divider } from 'antd';
import { listDB, removeDb } from './api';

const confirm = Modal.confirm;
const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class List extends React.Component {

  state = {
    pagination: {},
    data: []
  };

  componentDidMount() {
    this.onSearch();
  }

  onSearch = (value = "") => {
    console.info(value);
    let self = this;
    listDB({
      "keyword": value,
      "current": this.state.pagination.current
    }, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onDetail = (id) => {
    this.props.history.push("/page/db/detail/" + id)
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeDb({ "id": id }, function (data) {
          message.info("删除成功!");
          self.onSearch();
        })
      },
      onCancel() { },
    });
  }

  onAdd = () => {
    this.props.history.push("/page/db/add")
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
        dataIndex: 'host',
        key: 'host',
      }, {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
      }, {
        title: 'schema',
        dataIndex: 'schema',
        key: 'schema',
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
            <a href="javascript:;" onClick={this.onRemove.bind(this, record.id)}>删除</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.onDetail.bind(this, record.id)}>查看</a>
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
            <Button type="primary" onClick={this.onAdd.bind(this)}>新增</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </div>
    );
  }
}
export default withRouter(List)