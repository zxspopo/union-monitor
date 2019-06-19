import React from 'react'
import { withRouter } from "react-router-dom";
import { Input, Button, Form, message, Row, Col, Select, Popover, Icon } from 'antd';
import { addUrl, getUrlDetail, modifyUrl } from './api'


const InputGroup = Input.Group;
const { TextArea } = Input;
const { Option } = Select;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddUrl extends React.Component {

  state = {
    operate: 'add',
    urlInfo: {}
  }

  componentDidMount() {
    let urlId = this.props.match.params.id;
    let operate = this.props.match.params.operate;
    if (operate && operate != 'add') {
      let self = this;
      getUrlDetail({ "id": urlId }, function (data) {
        self.setState({
          operate: operate,
        });
        let urlInfo = data.dataList[0];
        self.props.form.setFieldsValue(urlInfo);
      })
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let self = this;
        if (this.state.operate == 'add') {
          addUrl(values, function (data) {
            message.info("增加成功!");
            self.props.history.push("/page/url/list");
          });
        } else {
          values.id = self.props.match.params.id;
          modifyUrl(values, function (data) {
            message.info("修改成功!");
            self.props.history.push("/page/url/list");
          });
        }
      }
    });
  };

  onCancel = () => {
    this.props.history.push("/page/url/list");
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12, },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 4,
        },
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };

    const ruleDesc = "@body@ 是告警变量，可以用于替换发送格式中的内容。"
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input name!',
              },
            ],
          })(<Input readOnly={this.state.operate == 'detail' ? true : false} />)}
        </Form.Item>


        <Form.Item label="url">
          <InputGroup compact>
            {getFieldDecorator('method', {
              initialValue: "1",
              rules: [
                {
                  required: true,
                  message: 'Please input method!',
                }
              ],
            })(<Select style={{ width: '15%' }} readOnly={this.state.operate == 'detail' ? true : false} >
              <Option value="1">get</Option>
              <Option value="2">post</Option>
            </Select>)}
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: 'Please input url!',
                }
              ],
            })(<Input style={{ width: '85%', textAlign: 'left' }} readOnly={this.state.operate == 'detail' ? true : false} />)}
          </InputGroup>
        </Form.Item >

        <Form.Item label="cookie">
          {getFieldDecorator('cookie', {
          })(<Input readOnly={this.state.operate == 'detail' ? true : false} />)}
        </Form.Item>
        <Form.Item label="headers">
          {getFieldDecorator('headers', {
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} readOnly={this.state.operate == 'detail' ? true : false} />)}
        </Form.Item>
        <Form.Item label={<span>
          requestBody&nbsp;
              <Popover title="规则说明" content={ruleDesc}>
            <Icon type="question-circle-o" />
          </Popover>
        </span>
        } >
          {getFieldDecorator('requestBody', {
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} readOnly={this.state.operate == 'detail' ? true : false} />)}
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          {this.state.operate == "add" ?
            <Button type="primary" htmlType="submit">
              保存
          </Button>
            : this.state.operate == "modify" ? <Button type="primary" htmlType="submit">
              修改
        </Button> : null}
          <Button type="primary" onClick={this.onCancel.bind(this)}>
            取消
          </Button>
        </Form.Item>
      </Form >
    );
  }
}
const WrappedForm = Form.create({

  //把父组件的属性映射到表单项上
  // mapPropsToFields(props) {
  //   console.info(props)
  //   return {
  //     name: Form.createFormField({ value: props.dataSourceContent.dbName }),
  //     dbPassword: Form.createFormField({ value: undefined }),
  //     dbType: Form.createFormField({ value: props.dataSourceContent.dbType ? props.dataSourceContent.dbType : "MYSQL" }),
  //     ip: Form.createFormField({ value: props.dataSourceContent.ip }),
  //     port: Form.createFormField({ value: props.dataSourceContent.port ? props.dataSourceContent.port : 3306 }),
  //     schemaName: Form.createFormField({ value: props.dataSourceContent.schemaName }),
  //     username: Form.createFormField({ value: undefined }),
  //   };
  // }
})(AddUrl);
export default withRouter(WrappedForm)