import React from 'react'
import { withRouter, Route, Switch } from "react-router-dom";
import asyncComponent from '@src/utils/asyncComponent.js';


const List = asyncComponent(() => import('./List'));
const AddKafka = asyncComponent(() => import('./Add'));
const Detail = asyncComponent(() => import('./detail'));
const AddTopic = asyncComponent(() => import('./AddTopic'));
//使用这种方式，如果组件内有错误，不会加载，只会显示loading
// const AddNewZk = Loadable({
//   loader: () => import('./Add'),
//   loading: Loading,
// });

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Kafka extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/page/kafka/list' component={List} />
          <Route path='/page/kafka/addKafka' component={AddKafka} />
          <Route path='/page/kafka/detail/:id' component={Detail} />
          <Route path='/page/kafka/addKafkaTopic/:id' component={AddTopic} />
        </Switch>
      </div>
    )
  };

}
export default withRouter(Kafka)