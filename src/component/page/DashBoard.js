import React from 'react'
import {withRouter} from "react-router-dom";
import { Menu, Icon } from 'antd';

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class DashBoard extends React.Component {

  render() {
    return "welcome";
  }
}
export default  withRouter(DashBoard)