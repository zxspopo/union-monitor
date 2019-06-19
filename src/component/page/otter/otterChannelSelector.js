import React from 'react'
import { Table, Row, Col, Input, Modal, Form, Button } from 'antd';
import { listChannelForModal, getChannelByIds } from './api';

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class OtterChannelSelector extends React.Component {

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
      listChannelForModal(values, existsIds, function (data) {
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
      let result = await getChannelByIds(this.state.selectedRowKeys);
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
        title: 'otterName',
        dataIndex: 'otterName',
        key: 'otterName'
      },
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
      }
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
              <Form.Item label="otter名称">
                {getFieldDecorator("otterName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="otterName" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="channel名称">
                {getFieldDecorator("channelName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="channel名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}  >
              <Form.Item label="cannel名称">
                {getFieldDecorator("cannelName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="cannel名称" />)}
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
const SearchForm = Form.create({ name: 'advanced_search' })(OtterChannelSelector);

export default SearchForm