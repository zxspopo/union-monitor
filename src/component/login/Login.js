import React from 'react'
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import cookie from "react-cookies"

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        cookie.save("m-user", "zxstest");
        //this.props.history.push("/");
        window.location.href = "/";
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{
        textAlign: "center", width: 400, height: 600, position: "absolute", left: "50%", top: "50%", marginLeft: "-150px", marginTop: "-100px"
      }
      }>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
          </a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div >
    );
  }
}

const WrappedLoginForm = Form.create()(Login);

export default withRouter(WrappedLoginForm)