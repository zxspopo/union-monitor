import React from 'react'
//引入路由
import { Route, Switch } from 'react-router-dom'
import asyncComponent from '@src/utils/asyncComponent.js';


const DashBoard = asyncComponent(() => import('../page/DashBoard'));
const zookeeper = asyncComponent(() => import('../page/zookeeper'));
const kafka = asyncComponent(() => import('../page/kafka'));
const otter = asyncComponent(() => import('../page/otter'));
const url = asyncComponent(() => import('../page/url'));
const alarm = asyncComponent(() => import('../page/alarm'));
const sysconfig = asyncComponent(() => import('../page/sysconfig'));
const rabbitmq = asyncComponent(() => import('../page/rabbitmq'));
const db = asyncComponent(() => import('../page/db'));


//使用这种方式，如果组件内有错误，不会加载，只会显示loading
// const DashBoard = Loadable({
//   loader: () => import('../page/DashBoard'),
//   loading: Loading,
// });

// const zookeeper = Loadable({
//   loader: () => import('../page/zookeeper'),
//   loading: Loading,
// });


class ContentMainRouter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={DashBoard} />
          <Route path='/page/zookeeper' component={zookeeper} />
          <Route path='/page/kafka' component={kafka} />
          <Route path='/page/otter' component={otter} />
          <Route path='/page/rabbitmq' component={rabbitmq} />
          <Route path='/page/url' component={url} />
          <Route path='/page/alarm' component={alarm} />
          <Route path='/page/db' component={db} />
          <Route path='/page/sysconfig' component={sysconfig} />
        </Switch>
      </div>
    )
  }
}

export default ContentMainRouter