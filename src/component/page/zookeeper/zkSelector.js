import React from 'react'
import { Select } from 'antd';
import { listZK } from './api';

const { Option } = Select;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class ZkSelector extends React.Component {

  state = {
    value: '',
    data: []
  };

  componentDidMount() {
  }

  handleChange = (newValue) => {
    const { value, onChange } = this.props;
    this.setState({ value: newValue });
    onChange(newValue);
  }

  handleSearch = (value) => {
    let self = this;
    listZK({ "keyword": value }, function (data) {
      self.setState({
        data: data.dataList
      })
    })
  };


  render() {
    const options = this.state.data.map(d => <Option key={d.id}>{d.name}({d.zkAddr})</Option>);
    return (
      <Select
        showSearch
        value={this.state.value}
        placeholder={this.state.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}
export default ZkSelector