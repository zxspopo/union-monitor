import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Divider } from 'antd';
import { kafkaDetail, listKafkaTopic, featchTopicOffset, removeTopic } from './api';

const confirm = Modal.confirm;
const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Detail extends React.Component {

  state = {
    kafkaId: '',
    kafkaInfo: {},
    pagination: {},
    data: [],
    subTabData: {}
  };

  componentDidMount() {
    let kafkaId = this.props.match.params.id;
    let self = this;
    kafkaDetail({ "id": kafkaId }, function (data) {
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
    listKafkaTopic({
      "keyword": value,
      "kafkaId": this.props.match.params.id,
      "current": this.state.pagination.current
    }, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onBack = (id) => {
    this.props.history.push("/page/kafka/list");
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeTopic({ "id": id }, function (data) {
          message.info("操作成功!");
          self.onSearch();
        })
      },
      onCancel() { },
    });
  }

  onAdd = () => {
    let kafkaId = this.props.match.params.id;
    this.props.history.push("/page/kafka/addKafkaTopic/" + kafkaId)
  }

  // handleExpand = (id) => {

  //   // let response = await featchTopicOffset({ "kafkaId": id });
  //   // console.info(response);
  //   // debugger
  //   return >;
  // }

  onExpand = async (expanded, record) => {
    if (expanded === false) {
      // 因为如果不断的添加键值对，会造成数据过于庞大，浪费资源，
      // 因此在每次合并的时候讲相应键值下的数据清空
      this.setState({
        subTabData: {
          ...this.state.subTabData,
          [record.id]: [],
        }
      });
    } else {
      let data = await featchTopicOffset({ "topicId": record.id });
      this.setState({
        subTabData: {
          ...this.state.subTabData,
          [record.id]: data.dataList,
        }
      });
    }
  }

  render() {

    const offsetColumns = [
      {
        title: 'partition',
        dataIndex: 'partition',
        key: 'partition'
      },
      {
        title: 'LogSize',
        dataIndex: 'logSize',
        key: 'logSize',
      },
      {
        title: 'Offset',
        dataIndex: 'offset',
        key: 'offset',
      },
      {
        title: 'Lag',
        dataIndex: 'lag',
        key: 'lag',
      }
    ];
    const columns = [
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
            <Button type="primary" onClick={this.onAdd.bind(this)}>新增</Button>
            <Button type="primary" onClick={this.onBack.bind(this)}>返回</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} expandRowByClick={false} onExpand={this.onExpand.bind(this)}
          expandedRowRender={record =>
            <div>
              <Button shape="circle" icon="reload" onClick={this.onExpand.bind(this, true, record)}></Button>
              <Table
                columns={offsetColumns}
                dataSource={this.state.subTabData[record.id]}
                pagination={false}
              />
            </div>} />
      </div>
    );
  }
}
export default withRouter(Detail)