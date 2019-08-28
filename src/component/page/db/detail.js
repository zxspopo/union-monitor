import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Tooltip, Divider } from 'antd';
import { dbDetail, listDBSql, sqlTest, removeSql } from './api';

const confirm = Modal.confirm;
const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Detail extends React.Component {

  state = {
    kafkaId: '',
    kafkaInfo: {},
    pagination: {},
    data: [],
    subTabData: {},
    visible: false
  };

  componentDidMount() {
    let kafkaId = this.props.match.params.id;
    let self = this;
    dbDetail({ "id": kafkaId }, function (data) {
      self.setState({
        kafkaInfo: data.dataList[0],
        kafkId: kafkaId
      })
    })
    this.onSearch();
  }

  onSearch = (value = "") => {
    console.info(value);
    let self = this;
    listDBSql({
      "keyword": value,
      "dbId": this.props.match.params.id,
      "current": this.state.pagination.current
    }, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onBack = (id) => {
    this.props.history.push("/page/db/list");
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeSql({ "id": id }, function (data) {
          message.info("操作成功!");
          self.onSearch();
        })
      },
      onCancel() { },
    });
  }

  onAdd = () => {
    let kafkaId = this.props.match.params.id;
    this.props.history.push("/page/db/addSql/" + kafkaId)
  }


  onTest = (id) => {
    let self = this;
    sqlTest({ "id": id }, function (data) {
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
        title: 'name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          if (record.content.length >= 15) {
            return <Tooltip title={record.content}>
              <span>{record.content.substr(0, 15)}...</span>
            </Tooltip>
          } else {
            return record.content;
          }
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onRemove.bind(this, record.id)}>删除</a>
            <Divider type="vertical"/>
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
            <Button type="primary" onClick={this.onAdd.bind(this)}>新增</Button>
            <Button type="primary" onClick={this.onBack.bind(this)}>返回</Button>
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
export default withRouter(Detail)