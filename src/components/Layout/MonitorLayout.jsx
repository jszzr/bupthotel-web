import React, { useState } from 'react';

import { Avatar, BackTop, Dropdown, Layout, Menu, Space } from 'antd';
import './Antd.css';
import './Layout.css';
import { Outlet, useNavigate } from 'react-router';
import { AdminDropdownIcon } from '../Common/Icon.jsx';
import { DefaultAvatar, Logo, Logo_p} from '../../utils/Resource.jsx';
const { Header, Sider, Content } = Layout;
import { API_URL } from '../../constants';

// 生成菜单结构

// 菜单数据

// 下拉菜单，只能使用这个变量名称，不然会报错
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/login">
                注销登录
            </a>
        ),
    },
];

// Layout
const MonitorLayout = () => {

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
                    <Content className="admin-content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <BackTop />
        </>
    );
};

export default MonitorLayout;
