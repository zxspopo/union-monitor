import React from 'react'
import { withRouter } from "react-router-dom";
import { Tabs } from 'antd';

import MainConfig from './MainConfig'
import PushUrl from './PushUrl'

const { TabPane } = Tabs;

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class SysConfig extends React.Component {

  state = {
    pagination: {},
    data: []
  };

  componentDidMount() {
  }

  callback = (key) => {
    if ("mail" == key) {
      this.mailChild.getMailInfo();
    } else if ("url" == key) {
      if (this.urlChild) {
        this.urlChild.getUrlInfo();
      }
    } else if ("weixin" == key) {
      //get weixin
    }
  }

  mailRef = (child) => {
    this.mailChild = child;
    child.getMailInfo();
  }

  urlRef = (child) => {
    this.urlChild = child;
    child.getUrlInfo();
  }

  render() {

    return (
      <Tabs defaultActiveKey="mail" onChange={this.callback}>
        <TabPane tab="邮箱" key="mail">
          <MainConfig onRef={this.mailRef.bind(this)} />
        </TabPane>
        <TabPane tab="url" key="url">
          <PushUrl onRef={this.urlRef.bind(this)} history={this.props.history}/>
        </TabPane>
        <TabPane tab="微信" key="weixin">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}
export default withRouter(SysConfig)