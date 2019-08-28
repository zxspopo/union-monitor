import React from 'react'
import { withRouter } from "react-router-dom";
import { Input, Button, Form, message, Select, Popover, Icon, Tooltip } from 'antd';
import { getRuleDetail, addTmpl } from './api'

const { TextArea } = Input;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class AddTmpl extends React.Component {

  componentDidMount() {
    let id = this.props.match.params.id;
    let self = this;
    getRuleDetail({ "id": id }, function (data) {
      let ruleInfo = data.dataList[0];
      self.props.form.setFieldsValue(ruleInfo);
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.id = this.props.match.params.id;
        addTmpl(values, function (data) {
          message.info("操作成功!");
          self.props.history.push("/page/alarm/list");
        });
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
        模板需要为标准freemarker语法
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
        <Form.Item label={<span>
          告警模板&nbsp;
              <Popover title="规则说明" content={ruleDesc}>
            <Icon type="question-circle-o" />
          </Popover>
        </span>
        }>
          {
            getFieldDecorator('alarmTemplate', {
              // rules: [
              //   {
              //     required: true,
              //     message: 'Please input 告警模板!',
              //   }
              // ],
            })(<TextArea autosize={{ minRows: 6, maxRows: 12 }} />)}
        </Form.Item >
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" onClick={this.onCancel.bind(this)}>
            取消
          </Button>
        </Form.Item>
      </Form >
    );
  }
}
const WrappedForm = Form.create()(AddTmpl);
export default withRouter(WrappedForm)