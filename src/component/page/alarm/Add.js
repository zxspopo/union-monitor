import React from 'react'
import { withRouter } from "react-router-dom";
import { Input, Button, Form, message, Select, Popover, Icon, Tooltip } from 'antd';
import { addRule, getRuleDetail, modifyRule } from './api'

const { Option } = Select;
const { TextArea } = Input;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddRule extends React.Component {

  state = {
    operate: "add"
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let operate = this.props.match.params.operate;
    if (operate && operate != 'add') {
      let self = this;
      getRuleDetail({ "id": id }, function (data) {
        self.setState({
          operate: operate,
        });
        let ruleInfo = data.dataList[0];
        self.props.form.setFieldsValue(ruleInfo);
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
          addRule(values, function (data) {
            message.info("增加成功!");
            self.props.history.push("/page/alarm/list");
          });
        } else {
          values.id = self.props.match.params.id;
          modifyRule(values, function (data) {
            message.info("修改成功!");
            self.props.history.push("/page/alarm/list");
          });
        }

      }
    });
  };

  onCancel = () => {
    this.props.history.push("/page/alarm/list");
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    const ruleDesc = (
      <div>
        监测结果表达式参考aviator 4.x
        <p>otter: ⎨"success": true,"channelStatus":"正常","pipelineStatus":"正常"⎬</p>
        <p>kafka channel:⎨"success": true,"logSize":"0","offset":"0","lag":"0"⎬</p>
        <p>url:⎨"success": true,"status":200,"consumeTime":1000,"body":"返回结果字符串","bodyMap":"将结果转换成Map"⎬</p>
        <p>rabbitmq:⎨"success": true,"consumeTime":1000⎬</p>
        <p>db:⎨"success": true,"consumeTime":1000,resultMapList:sql结果集的list⎬</p>
      </div>
    );

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
                message: 'Please input name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="执行周期">
          {getFieldDecorator('crontab', {
            rules: [
              {
                required: true,
                message: 'Please input crontab!',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="类型">
          {getFieldDecorator("envType", {
            initialValue: "1",
            rules: [
              {
                required: true,
                message: 'Please input envType!',
              }
            ],
          })(<Select >
            <Option value="1">otter</Option>
            <Option value="2">kafka</Option>
            <Option value="3">url</Option>
            <Option value="4">rabbitmq</Option>
            <Option value="5">db-sql</Option>
          </Select>)}
        </Form.Item >
        <Form.Item label={<span>
          监测规则&nbsp;
              <Popover title="规则说明" content={ruleDesc}>
            <Icon type="question-circle-o" />
          </Popover>
        </span>
        }>
          {
            getFieldDecorator('expression', {
              rules: [
                {
                  required: true,
                  message: 'Please input expression!',
                }
              ],
            })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item >
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
const WrappedForm = Form.create()(AddRule);
export default withRouter(WrappedForm)