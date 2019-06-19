import React from 'react'
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './menu.less';

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {

    menuItemClick = (item, key, keyPath) => {
        const link = item.key;
        if (link) {
            this.props.history.push(link);
        } else {
            console.warn('该menuItem无link属性')
        }
    };

    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}{title}</span>} style={{ textAlign: "left" }}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ key, icon, title, }) => {
        return (
            <Menu.Item key={key} link={key} style={{ textAlign: "left" }}>

                {/* <span> */}
                {icon && <Icon type={icon} />}
                <span>{title}</span>
                {/* </span> */}
            </Menu.Item>
        )
    }


    render() {
        let menus = [
            {
                title: '首页',
                icon: 'dashboard',
                key: '/'
            }, {
                title: '环境配置',
                icon: 'setting',
                key: 'sub1',
                subs: [
                    { key: '/page/zookeeper/list', title: 'zookeeper', icon: 'robot' },
                    { key: '/page/kafka/list', title: 'kafka', icon: 'robot' },
                    { key: '/page/otter/list', title: 'otter', icon: 'robot' },
                    { key: '/page/url/list', title: 'url', icon: 'robot' },
                ]
            }, {
                title: '系统配置',
                icon: 'alert',
                key: 'sub2',
                subs: [
                    { key: '/page/alarm/list', title: '告警配置', icon: 'robot' },
                    { key: '/page/sysconfig/config', title: '推送设置', icon: 'robot' },
                ]

            }
        ];
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onClick={this.menuItemClick.bind(this)}
                mode="inline"
            >
                {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}
export default withRouter(CustomMenu)