import React from 'react'
import { withRouter } from "react-router-dom";
import { Input, Button, Form, message } from 'antd';
import { addOtter } from './api'
import ZkSelector from '@src/component/page/zookeeper/zkSelector'

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddOtter extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let self = this;
        addOtter(values, function (data) {
          message.info("增加成功!");
          self.props.history.push("/page/otter/list");
        });
      }
    });
  };

  onCancel = () => {
    this.props.history.push("/page/otter/list");
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 8,
        },
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                validator: true,
                message: 'Please input otter name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="zk地址">
          {getFieldDecorator('zkId', {
            rules: [
              {
                validator: true,
                message: 'Please select zk!',
              }
            ],
          })(<ZkSelector />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" onClick={this.onCancel.bind(this)}>
            取消
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedForm = Form.create()(AddOtter);
export default withRouter(WrappedForm)