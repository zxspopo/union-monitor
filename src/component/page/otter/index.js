import React from 'react'
import { withRouter, Route, Switch } from "react-router-dom";
import asyncComponent from '@src/utils/asyncComponent.js';


const List = asyncComponent(() => import('./List'));
const AddOtter = asyncComponent(() => import('./Add'));
const Detail = asyncComponent(() => import('./detail'));
const AddChannel = asyncComponent(() => import('./AddChannel'));
//使用这种方式，如果组件内有错误，不会加载，只会显示loading
// const AddNewZk = Loadable({
//   loader: () => import('./Add'),
//   loading: Loading,
// });

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class Otter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/page/otter/list' component={List} />
          <Route path='/page/otter/addOtter' component={AddOtter} />
          <Route path='/page/otter/detail/:id' component={Detail} />
          <Route path='/page/otter/addChannel/:id' component={AddChannel} />
        </Switch>
      </div>
    )
  };

}
export default withRouter(Otter)