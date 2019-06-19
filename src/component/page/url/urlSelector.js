import React from 'react'
import { Table, Row, Col, Input, Modal } from 'antd';
import { listUrl, getUrlByKeys } from './api';

const Search = Input.Search;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class UrlSelector extends React.Component {

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

  handleSearch = (value) => {
    let self = this;
    let existsIds = [];
    for (let i = 0; i < this.props.existsList.length; i++) {
      existsIds.push(this.props.existsList[i].id);
    }
    listUrl({ "keyword": value }, existsIds, function (data) {
      self.setState({
        data: data.dataList,
        pagination: data.pagination
      })
    })
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });

  }


  handleOk = async (e) => {
    let selectData = [];
    if (this.state.selectedRowKeys.length > 0) {
      let result = await getUrlByKeys(this.state.selectedRowKeys);
      selectData = result.dataList;
    }
    this.props.handleOK(selectData);
  };

  handleCancel = e => {
    this.props.handleCancel();
  };

  render() {

    const { selectedRowKeys } = this.state;
    const columns = [
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
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        width={800}
      >
        <Row>
          <Col span={8}>
            <Search placeholder="input search text" onSearch={value => this.handleSearch(value)} enterButton />
          </Col>
        </Row>
        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={this.state.pagination} />
      </Modal>
    );
  }
}
export default UrlSelector