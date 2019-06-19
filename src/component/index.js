import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import cookie from 'react-cookies';


import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
const {
  Sider, Content, Header
} = Layout;

import CustomMenu from "./menu/CustomMenu"
import ContentMainRouter from "./menu/ContentMainRouter"
import Login from "./login/Login"



class Welcome extends React.Component {

  state = {
    userName: ''
  };

  componentDidMount() {
    this.userLogin();
  }


  userLogin = () => {
    // UserAPI.getUserInfo(function (data) {
    //   this.setState({
    //     userName: data.userName
    //   })
    // });
    const userName = cookie.load('m-user');
    if (userName && userName != null && userName != '') {
      this.setState({ userName: userName })
    }
  }

  logout = () => {
    cookie.remove("m-user");
    this.props.history.push("/login");
  }

  render() {
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (this.state.userName == '') {
      return (
        <div className="App">
          <Login />
        </div>
      )
    } else {
      return (
        <div className="App">
          <BrowserRouter>
            <Layout>
              <Sider style={{ height: screenHeight, background: '#fff' }}>
                <CustomMenu />
              </Sider>
              <Layout>
                <Header style={{ height: 50, background: '#fff' }}>
                  <div style={{ float: "right" }}>
                    Hello,{this.state.userName}!
                  <Button type="dashed" onClick={this.logout.bind(this)} size="small"> 退出</Button>
                  </div>
                </Header>
                <Content style={{ height: screenHeight }}>
                  <ContentMainRouter />
                </Content>
                {/*<Footer>Footer</Footer>*/}
              </Layout>
            </Layout>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default withRouter(Welcome);
