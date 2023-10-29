import React, {useState} from 'react';
import DashboardHeader from "./DashboardHeader.jsx";
import "./Dashboard.css"
import {
    ProCard,
} from '@ant-design/pro-components';
import MyTime from "../MyTime/MyTime.jsx";
import {Progress} from "antd";


// 仪表盘工作台
const Dashboard = () => {
    return (
        <>
            <DashboardHeader />
            <ProCard split="vertical">
                {/*<ProCard title="房间详情" colSpan="30%">*/}
                {/*    <div style={{ width: '100%' }}>*/}
                {/*        <MyTime style={{ height: 100, width: 100 }} />*/}
                {/*    </div>*/}
                {/*</ProCard>*/}

                <ProCard gutter={[4, 32]} colSpan="30%" split="horizontal">
                    <ProCard colSpan="80" title="我的房间" boxShadow></ProCard>
                    <ProCard colSpan="99%" title="当前时间" headerBordered bordered boxShadow>
                        <div style={{ width: '100%' }}>
                            <MyTime style={{ height: 100, width: 100 }} />
                        </div>
                    </ProCard>
                    <ProCard colSpan="99%" title="等待状态" headerBordered bordered boxShadow>
                        <Progress type="circle" />
                    </ProCard>
                    <ProCard colSpan="99%" title="累计费用" headerBordered bordered boxShadow>

                    </ProCard>
                </ProCard>
                <ProCard title= "空调状态" headerBordered>

                    <div style={{ height: 360 }}>111</div>
                </ProCard>
            </ProCard>
        </>
    );
};

export default Dashboard;
