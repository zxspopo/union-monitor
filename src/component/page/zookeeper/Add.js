import React from 'react'
import { withRouter } from "react-router-dom";
import { Input, Button, Form, message } from 'antd';
import { addZK } from './api'

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddNewZk extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let self = this;
        addZK(values, function (data) {
          message.info("增加成功!");
          self.props.history.push("/page/zookeeper/list");
        });
      }
    });
  };

  onCancel = () => {
    this.props.history.push("/page/zookeeper/list");
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
                required: true,
                message: 'Please input zk name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="zkAddr">
          {getFieldDecorator('zkAddr', {
            rules: [
              {
                required: true,
                message: 'Please input zkAddr!',
              }
            ],
          })(<Input />)}
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
const WrappedForm = Form.create()(AddNewZk);
export default withRouter(WrappedForm)