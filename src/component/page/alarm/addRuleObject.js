import React from 'react'
import { withRouter } from "react-router-dom";
import { Descriptions, Button, Table, Card, message, Modal, Tooltip } from 'antd';
import { getRuleDetail, saveRuleObject } from './api'
import { listKafkaTopic } from "../kafka/api"
import { listChannel } from "../otter/api"
import { listUrl } from "../url/api"
import { listMQ } from "../rabbitmq/api"
import { listDBSql } from "../db/api"
import update from 'immutability-helper';
import UrlSelect from '@src/component/page/url/urlSelector'
import OtterChannelSelector from '@src/component/page/otter/otterChannelSelector'
import KafkaTopicSelector from '@src/component/page/kafka/kafkaTopicSelector'
import RabbitMQSelector from "@src/component/page/rabbitmq/RabbitMQSelector"
import DBSqlSelector from "@src/component/page/db/DbSqlSelector"

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddRoleObject extends React.Component {

  state = {
    ruleInfo: {},
    dataList: [],
    objectTitle: "",
    operate: "add",
    visible: false
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let operate = this.props.match.params.operate;
    let self = this;
    getRuleDetail({ "id": id }, function (data) {
      self.setState({
        ruleInfo: data.dataList[0],
        dataList: data.dataList[0].objectList || [],
        operate: operate,
        objectTitle: data.dataList[0].envType == '1' ? '选择otter channel' : data.dataList[0].envType == '2' ? '选择kafka Topic' : data.dataList[0].envType == '3' ? '选择url' : data.dataList[0].envType == '4' ? '选择RabbitMQ' : '选择InfluxDB'
      });
    })
  }

  onCancel = () => {
    this.props.history.push("/page/alarm/list");
  }

  onSave = () => {
    let self = this;
    let ids = [];
    for (var i = 0; i < this.state.dataList.length; i++) {
      ids.push(this.state.dataList[i].id);
    }
    saveRuleObject({ "ruleId": this.props.match.params.id, "objectList": ids }, function (data) {
      message.info("操作成功!");
      self.props.history.push("/page/alarm/list");
    })
  }

  onSelectAll = () => {
    let self = this;
    if (this.state.ruleInfo.envType == '1') {
      //otter
      listChannel({ "queryAll": "true" }, function (data) {
        let result = update(self.state.dataList, { $merge: data.dataList });
        self.setState({
          dataList: result
        })
      })
    }
    else if (this.state.ruleInfo.envType == '2') {
      //kafka
      listKafkaTopic({ "queryAll": "true" }, function (data) {
        let result = update(self.state.dataList, { $merge: data.dataList });
        self.setState({
          dataList: result
        })
      })
    } else if (this.state.ruleInfo.envType == '3') {
      //url
      listUrl({ "queryAll": "true" }, [], function (data) {
        let result = update(self.state.dataList, { $merge: data.dataList });
        self.setState({
          dataList: result
        })
      })
    } else if (this.state.ruleInfo.envType == '4') {
      //rabbitmq
      listMQ({ "queryAll": "true" }, [], function (data) {
        let result = update(self.state.dataList, { $merge: data.dataList });
        self.setState({
          dataList: result
        })
      })
    }
    else if (this.state.ruleInfo.envType == '5') {
      //db-sql
      listDBSql({ "queryAll": "true" }, [], function (data) {
        let result = update(self.state.dataList, { $merge: data.dataList });
        self.setState({
          dataList: result
        })
      })
    }
  }



  onRemove = (record) => {
    let id = record.id;
    debugger
    for (let idx = 0; idx < this.state.dataList.length; idx++) {
      const element = this.state.dataList[idx];
      if (id == element.id) {
        let result = update(
          this.state.dataList, { $splice: [[idx, 1]] }
        );
        this.setState({
          dataList: result
        });
        break;
      }
    }
  }

  onSelect = () => {
    this.setState({
      visible: true,
    });
    this.child.handleSearch();
  }

  handleOK = (dataList) => {
    let result = update(this.state.dataList, { $push: dataList });
    this.setState({
      dataList: result,
      visible: false
    })

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  onRef = (ref) => {
    this.child = ref;
  }

  render() {

    const urlColumn = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '地址',
        dataIndex: 'url',
        key: 'url',
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
            <a href="javascript:;" onClick={this.onRemove.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];

    const otterColumn = [
      {
        title: 'channelName',
        dataIndex: 'channelName',
        key: 'channelName'
      },
      {
        title: 'cannelName',
        dataIndex: 'cannelName',
        key: 'cannelName'
      },
      {
        title: 'otterName',
        dataIndex: 'otterName',
        key: 'otterName',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onRemove.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];

    const kafkaColumn = [
      {
        title: 'topic',
        dataIndex: 'topic',
        key: 'topic'
      },
      {
        title: 'group',
        dataIndex: 'group',
        key: 'group',
      },
      {
        title: 'kafkaAddr',
        dataIndex: 'kafkaEntity.broker',
        key: 'kafkaEntity.broker',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onRemove.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];

    const rabbitmqColumn = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <Tooltip title={record.username + ":" + record.password}>
            <span>{record.name}</span>
          </Tooltip >
        }
      },
      {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
      },
      {
        title: 'Port',
        dataIndex: 'port',
        key: 'port',
      },
      {
        title: 'VirtualHost',
        dataIndex: 'vhost',
        key: 'vhost',
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
            <a href="javascript:;" onClick={this.onRemove.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];

    const dbsqlColumn = [
      {
        title: '数据库名称',
        dataIndex: 'dbEntity.name',
        key: 'dbEntity.name'
      },
      {
        title: '数据ip',
        dataIndex: 'dbEntity.host',
        key: 'dbEntity.host'
      },
      {
        title: 'sql 名称',
        dataIndex: 'name',
        key: 'name',
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
      }
    ];

    const column = this.state.ruleInfo.envType == '1' ? otterColumn : this.state.ruleInfo.envType == '2' ? kafkaColumn : this.state.ruleInfo.envType == '3' ? urlColumn : this.state.ruleInfo.envType == '4' ? rabbitmqColumn : dbsqlColumn;


    return (
      <div>
        {this.state.operate == 'add' ?
          <Button type="primary" onClick={this.onSave.bind(this)}>
            保存
          </Button> : null}
        <Button type="primary" onClick={this.onCancel.bind(this)}>
          取消
          </Button>
        <Card title="规则信息">
          <Descriptions bordered={true} >
            <Descriptions.Item label="名称">{this.state.ruleInfo.name}</Descriptions.Item>
            <Descriptions.Item label="类型">{this.state.ruleInfo.envType == '1' ? "otter" : this.state.ruleInfo.envType == '2' ? "kafka" : this.state.ruleInfo.envType == '3' ? "url" :this.state.ruleInfo.envType == '4' ? "rabbitmq" :"db-sql"}</Descriptions.Item>
            <Descriptions.Item label="crontab">{this.state.ruleInfo.crontab}</Descriptions.Item>
            <Descriptions.Item label="expression">{this.state.ruleInfo.expression}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="对象列表" extra={this.state.operate == 'add' ? <div><Button type="primary" onClick={this.onSelectAll.bind(this)}>全选</Button><Button type="primary" onClick={this.onSelect.bind(this)}>选择对象</Button></div> : null}>
          <Table columns={column} dataSource={this.state.dataList} />
        </Card>
        {this.state.operate == 'add' ?
          <Button type="primary" onClick={this.onSave.bind(this)}>
            保存
          </Button> : null}
        <Button type="primary" onClick={this.onCancel.bind(this)}>
          取消
          </Button>
        {
          this.state.ruleInfo.envType == '3' ?
            <UrlSelect onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.dataList} /> :
            this.state.ruleInfo.envType == '1' ?
              <OtterChannelSelector onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.dataList} /> :
              this.state.ruleInfo.envType == '2' ?
                <KafkaTopicSelector onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.dataList} />
                :
                this.state.ruleInfo.envType == '4' ?
                  <RabbitMQSelector onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.dataList} /> :
                  <DBSqlSelector onRef={this.onRef} visible={this.state.visible} title={this.state.objectTitle} handleOK={this.handleOK} handleCancel={this.handleCancel} existsList={this.state.dataList} />
        }
      </div >
    )
  }
}
export default withRouter(AddRoleObject)