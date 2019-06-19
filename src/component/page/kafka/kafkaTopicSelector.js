import React from 'react'
import { Table, Row, Col, Input, Modal, Form, Button } from 'antd';
import { listTopicForModal, getTopicByIds } from './api';

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class KafkaTopicSelector extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    pagination: {},
    data: [],
    selectedRowKeys: [],
    selectList: []
  };

  componentDidMount() {
    // this.handleSearch();
    this.props.onRef(this);
  }

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    let self = this;
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      let existsIds = [];
      for (let i = 0; i < this.props.existsList.length; i++) {
        existsIds.push(this.props.existsList[i].id);
      }
      listTopicForModal(values, existsIds, function (data) {
        self.setState({
          data: data.dataList,
          pagination: data.pagination
        })
      })
    });

  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });

  }


  handleOk = async (e) => {
    let selectData = [];
    if (this.state.selectedRowKeys.length > 0) {
      let result = await getTopicByIds(this.state.selectedRowKeys);
      selectData = result.dataList;
    }
    this.props.handleOK(selectData);
  };

  handleCancel = e => {
    this.props.handleCancel();
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {

    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: 'kafkaAddr',
        dataIndex: 'kafkaEntity.broker',
        key: 'kafkaEntity.broker'
      },
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
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        width={800}
      >
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={8}  >
              <Form.Item label="kafkaAddr">
                {getFieldDecorator("kafkaAddr", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="kafkaAddr" />)}
              </Form.Item>
            </Col>
            <Col span={8}  >
              <Form.Item label="kafka名称">
                {getFieldDecorator("kafkaName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="kafkaName" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="topic名称">
                {getFieldDecorator("topicName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="topicName" />)}
              </Form.Item>
            </Col>
            <Col span={8}  >
              <Form.Item label="groupName">
                {getFieldDecorator("groupName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="groupName" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
            </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
            </Button>
            </Col>
          </Row>
        </Form>
        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </Modal >
    );
  }
}
const SearchForm = Form.create({ name: 'advanced_search' })(KafkaTopicSelector);

export default SearchForm