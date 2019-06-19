import React from 'react'
import {
  Form,
  Input,
  Select,
  Button, message
} from 'antd';
import { getMailInfo, modifyMail } from './api';

const { TextArea } = Input;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class MainConfig extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    view: true
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  getMailInfo = () => {
    let self = this;
    getMailInfo({}, function (data) {
      let ruleInfo = data.dataList[0];
      self.props.form.setFieldsValue(ruleInfo);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    let self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        modifyMail(values, function (data) {
          self.setState({
            view: true
          });
          message.info("操作成功");
        });
      }
    });
  };

  editForm = () => {
    this.setState({
      view: false
    })
  }

  cancel = () => {
    this.setState({
      view: true
    })
    this.getMailInfo();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Button type="primary" icon="form" onClick={this.editForm.bind(this)}>修改</Button>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Form.Item label="协议">
            {getFieldDecorator('protocol', {
              initialValue: "1",
              rules: [
                {
                  required: true,
                  message: 'Please input protocol!',
                },
              ],
            })(<Select readOnly={this.state.view}>
              <Option value="1">SMTP</Option>
            </Select>)}
          </Form.Item>
          <Form.Item
            label="服务器地址"
          >
            {getFieldDecorator('addr', {
              rules: [{ required: true, message: 'Please input addr!', whitespace: true }],
            })(<Input readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item
            label="服务器端口"
          >
            {getFieldDecorator('port', {
              rules: [{ required: true, message: 'Please input port!', whitespace: true }],
            })(<Input readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item
            label="发件人邮箱"
          >
            {getFieldDecorator('sendUser', {
              rules: [{ required: true, message: 'Please input sendUser!', whitespace: true }],
            })(<Input readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item
            label="用户名"
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input username!', whitespace: true }],
            })(<Input readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                }
              ],
            })(<Input.Password readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item label="收件人列表(,)">
            {getFieldDecorator('recvUsers', {
              rules: [
                // {
                //   required: true,
                //   message: 'Please input your password!',
                // }
              ],
            })(<TextArea readOnly={this.state.view} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {this.state.view ? null :
              <div>
                <Button type="primary" htmlType="submit">
                  保存
          </Button><Button type="primary" onClick={this.cancel.bind(this)}>
                  取消
          </Button></div>
            }
          </Form.Item>
        </Form>
      </div>
    );
  }
}


const WrappedForm = Form.create({ name: 'register' })(MainConfig);
export default WrappedForm