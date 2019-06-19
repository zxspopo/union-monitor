import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom'


import 'antd/dist/antd.css';
import { Layout } from 'antd';
const {
  Sider, Content,
} = Layout;

import Login from "./component/login/Login"
import Welcome from "./component/index"



class App extends React.Component {

  render() {

    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
