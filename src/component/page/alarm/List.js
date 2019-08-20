import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Divider, Tooltip } from 'antd';
import { listRules, removeRule } from './api';

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
    listRules({
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
    this.props.history.push("/page/alarm/addObject/" + id + "/detail");
  }


  onModify = (id) => {
    this.props.history.push("/page/alarm/add/" + id + "/modify");
  }

  onAddObject = (id) => {
    this.props.history.push("/page/alarm/addObject/" + id + "/add");
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeRule({ "id": id }, function (data) {
          message.info("删除成功");
          self.onsearch();
        })
        console.info("删除记录" + id);
      },
      onCancel() { },
    });
  }

  addRule = () => {
    this.props.history.push("/page/alarm/add")
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
        title: '类型',
        dataIndex: 'envType',
        key: 'envType',
        render: (text, record) => {
          if (record.envType == '1') {
            return "OTTER";
          } else if (record.envType == '2') {
            return "CHANNEL";
          } else if (record.envType == '3') {
            return "URL";
          } else if (record.envType == '4') {
            return "RABBITMQ";
          } else if (record.envType == '5') {
            return "INFLUXDB";
          }
          return "未知";
        },
      },
      {
        title: '规则',
        dataIndex: 'expression',
        render: (text, record) => {
          if (record.expression.length >= 100) {
            return <Tooltip title={record.expression}>
              <span>{record.expression.substr(0, 100)}...</span>
            </Tooltip>
          } else {
            return record.expression;
          }
        },
      }, {
        title: '执行周期',
        dataIndex: 'crontab',
        key: 'crontab',
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
            <a href="javascript:;" onClick={this.onModify.bind(this, record.id)}>修改规则</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.onAddObject.bind(this, record.id)}>添加监控对象</a>
            <Divider type="vertical" />
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
            <Button type="primary" onClick={this.addRule.bind(this)}>新增</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </div>
    );
  }
}
export default withRouter(List)