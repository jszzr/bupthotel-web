import React from 'react';
import {Navigate, useRoutes} from 'react-router';
import AdminLayout from '../components/layout/CommonLayout.jsx';
import LazyLoad from './Lazy.jsx'; // 注释

export const RouteData = [
    {
        path: '/', // 首页跳转;
        element: <Navigate to="/dashboard" />,
    },
    {
        // 后台路由
        path: '/',
        element: <AdminLayout />,
        // 子页面
        children: [
            {
                path: 'dashboard', // 工作台
                element: LazyLoad(React.lazy(() => import('/src/components/Dashboard/Dashboard.jsx'))),
            },
            {
                path: 'UserPage', // 用户中心
                children: [
                    {
                        path: 'SetUp', // 开机
                        element: LazyLoad(React.lazy(() => import('/src/components/UserPage/SetUp/AirConditionerControl.jsx'))),
                    },
                    {
                        path: 'WaitingList', // 等待详情
                        element: LazyLoad(
                            React.lazy(() => import('/src/components/UserPage/WaitingList.jsx')),
                        ),
                    },
                    {
                        path: 'Fee', // 计费
                        element: LazyLoad(React.lazy(() => import('/src/components/UserPage/Fee.jsx'))),
                    },
                ],
            },
            {
                path: 'me', // 个人中心
                element: LazyLoad(React.lazy(() => import('/src/components/UserPage/UserCenter.jsx'))),
            },
            {
                path: 'help', // 帮助页
                element: LazyLoad(React.lazy(() => import('/src/components/Help/Help.jsx'))),
            },
            {
                path: '404', // 404
                element: LazyLoad(React.lazy(() => import('/src/components/error/PageNotFound.jsx'))),
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/404" />,
    },
];

// 生成路由列表
const RouteList = () => {
    return useRoutes(RouteData);
};

export default RouteList;
