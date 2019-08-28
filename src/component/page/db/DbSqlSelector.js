import React from 'react'
import { Table, Row, Col, Input, Modal, Form, Button, Tooltip } from 'antd';
import { listSqlForModal, querySqlByIds } from './api';

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class DbSqlSelector extends React.Component {

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

      if (this.props.existsList) {
        for (let i = 0; i < this.props.existsList.length; i++) {
          existsIds.push(this.props.existsList[i].id);
        }
      }
      listSqlForModal(values, existsIds, function (data) {
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
      let result = await querySqlByIds(this.state.selectedRowKeys);
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
              <Form.Item label="数据库名称">
                {getFieldDecorator("dbName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="数据库名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}  >
              <Form.Item label="数据库IP">
                {getFieldDecorator("host", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="数据库IP" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="sql名称">
                {getFieldDecorator("sqlName", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="sql名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}  >
              <Form.Item label="sql内容">
                {getFieldDecorator("sqlContent", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Input something!',
                  //   },
                  // ],
                })(<Input placeholder="sql内容" />)}
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
const SearchForm = Form.create({ name: 'advanced_search' })(DbSqlSelector);

export default SearchForm