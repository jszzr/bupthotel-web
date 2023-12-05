import React from 'react';
import {Navigate, Outlet, useRoutes} from 'react-router';
import AdminLayout from '../components/layout/CommonLayout.jsx';
import LazyLoad from './Lazy.jsx'; // 注释
import MonitorLayout from "../components/Layout/MonitorLayout.jsx";
import Monitor from "../components/AdminPage/Monitor.jsx";
import {Route} from "wouter";
export const RouteData  = [
    {
        path: '/', // 首页跳转;
        element: <Navigate to="/dashboard" />,

    },
    {
        path: 'Login', // 工作台
        element: LazyLoad(React.lazy(() => import('/src/components/Login/Login.jsx'))),
    },
    {
        path: 'Register', // 工作台
        element: LazyLoad(React.lazy(() => import('/src/components/Login/Register.jsx'))),
    },
    // {
    //     path: 'AdminPage', // 用户中心
    //     children: [
    //         {
    //             path: 'Monitor', // 开机
    //             element: <MonitorLayout>
    //                 <Outlet>
    //                     <Route
    //                         path="monitor"
    //                         element={<LazyLoad>{() => <Monitor />}</LazyLoad>}
    //                     />
    //                 </Outlet>
    //             </MonitorLayout>,
    //         },
    //     ],
    // },
    {
        path: '/AdminPage', // 用户中心
        element: <MonitorLayout />,
        children: [
            {
                path: 'Monitor', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Monitor.jsx'))),
            },
            {
                path: 'Front', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Front.jsx'))),
            },
            {
                path: 'Bill_Detail', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Bill_Detail.jsx'))),
            },
            {
                path: 'Bill_Cost', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Bill_Cost.jsx'))),
            },
            {
                path: 'Daily_report', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Daily_report.jsx'))),
            },
            {
                path: 'Weekly_report', // 开机
                element: LazyLoad(React.lazy(() => import('/src/components/AdminPage/Weekly_report.jsx'))),
            },

        ],
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
                            React.lazy(() => import('/src/components/UserPage/SetUp/WaitingList.jsx')),
                        ),
                    },
                    {
                        path: 'Fee', // 计费
                        element: LazyLoad(React.lazy(() => import('/src/components/UserPage/Fee/Fee.jsx'))),
                    },
                ],
            },
            {
                path: 'Pay', // 个人中心
                element: LazyLoad(React.lazy(() => import('/src/components/UserPage/Fee/pay.jsx'))),
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
