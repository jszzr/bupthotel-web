import React, { useState } from 'react';
import {
    FileProtectOutlined,
    SettingOutlined,
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Avatar, BackTop, Dropdown, Layout, Menu, Space } from 'antd';
import './Antd.css';
import './Layout.css';
import { Outlet, useNavigate } from 'react-router';
import { AdminDropdownIcon } from '../Common/Icon.jsx';
import { DefaultAvatar, Logo, Logo_p} from '../../utils/Resource.jsx';
const { Header, Sider, Content } = Layout;

// 生成菜单结构
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// 菜单数据
const menus = [
    getItem('房间面板', '/dashboard', <HomeOutlined />),
    getItem('空调面板', '/UserPage', <SettingOutlined />, [
        getItem('申请开机', '/UserPage/SetUp'),
        getItem('排队状态', '/UserPage/WaitingList'),
        getItem('费用详情', '/UserPage/Fee'),
    ]),
    getItem('个人中心', '/me', <UserOutlined />),
    getItem('获取帮助', '/help', <FileProtectOutlined />),
];

const handleLogout = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("/logout", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        navigate('/login'); // 跳转到登录页面
      })
      .catch(error => console.log('error', error));
  };

// 下拉菜单，只能使用这个变量名称，不然会报错
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                用户中心
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a onClick={handleLogout}  href="/login">
                注销登录
            </a>
        ),
    },
];

// Layout
const CommonLayout = () => {
    // 路由跳转
    const navigate = useNavigate();
    // 菜单状态
    const [collapsed, setCollapsed] = useState(false);


    return (
        <>
        
            <Layout>
                <Header className="admin-header">
                    <div className="admin-header-left">
                        <img src={Logo} className="admin-logo" alt="" />
                    </div>
                    <div className="admin-header-right">
                        <Dropdown
                            menu={{
                                items,
                            }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <   Space>
                                    <Avatar className="admin-avatar" src={DefaultAvatar} />
                                    <AdminDropdownIcon />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout className="admin-main" >
                    <Sider
                        width={220}
                        className="admin-sider"

                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <div className="admin-sider-content">
                            <Menu
                                className="admin-sider-menu"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                items={menus}
                                onClick={({ key }) => {
                                    console.log(key);
                                    navigate(key); // 路由跳转
                                }}
                            />
                            <div className="admin-sider-image">
                                <img src={Logo_p} alt="Logo" />
                            </div>
                        </div>
                    </Sider>                    <Layout>
                        <Content className="admin-content">
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            <BackTop />
        </>
    );
};

export default CommonLayout;
