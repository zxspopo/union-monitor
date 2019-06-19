import React from 'react'
import { withRouter } from "react-router-dom";
import { Table, Input, Modal, Button, Row, Col, message, Divider } from 'antd';
import { listChannel ,removeChannel} from './api';

const confirm = Modal.confirm;
const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Detail extends React.Component {

  state = {
    otterId: '',
    kafkaInfo: {},
    pagination: {},
    data: [],
    subTabData: {}
  };

  componentDidMount() {
    this.onSearch();
  }

  onSearch = (number = 0, value = "") => {
    console.info(value);
    let otterId = this.props.match.params.id;
    let self = this;
    listChannel({
      "otterId": otterId,
      "keyword": value
    }, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      });
    })
  }

  onBack = (id) => {
    this.props.history.push("/page/otter/list");
  }

  onRemove = (id) => {
    let self = this;
    confirm({
      title: '确定删除这条记录?',
      // content: '确定删除这条记录?',
      onOk() {
        removeChannel({"id":id},function(data){
          message.info("删除成功!");
          self.onSearch();
        })
        
      },
      onCancel() { },
    });
  }

  onAdd = () => {
    let otterId = this.props.match.params.id;
    this.props.history.push("/page/otter/addChannel/" + otterId)
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
      let data = await featchTopicOffset({ "id": record.id });
      console.info(data);
      this.setState({
        subTabData: {
          ...this.state.subTabData,
          [record.id]: data.dataList,
        }
      });
    }
  }

  render() {

    const columns = [
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
        title: 'channelStatus',
        dataIndex: 'channelStatus',
        key: 'channelStatus',
      }, {
        title: 'pipelineStatus',
        dataIndex: 'pipelineStatus',
        key: 'pipelineStatus',
      }, {
        title: 'lastSyncTime',
        dataIndex: 'lastSyncTime',
        key: 'lastSyncTime',
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
        <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </div>
    );
  }
}
export default withRouter(Detail)