import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message } from 'antd';
import { listZK, removeZK } from './api';

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
    listZK({
      "keyword": value,
      "current": this.state.pagination.current
    }, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onRemove = async (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeZK({ "id": id }, function (data) {
          message.info("操作成功!");
          self.onSearch();
        });
      },
      onCancel() { },
    });
  }

  addNewZk = () => {
    this.props.history.push("/page/zookeeper/addZK")
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '地址',
        dataIndex: 'zkAddr',
        key: 'zkAddr',
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
            <Button type="primary" onClick={this.addNewZk.bind(this)}>新增</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </div>
    );
  }
}
export default withRouter(List)