import React, { useState } from 'react';
import {Button, Col, Divider, Progress, Row, Typography} from 'antd';
import PageHeader from "../Common/Header.jsx";
import {ProCard} from "@ant-design/pro-components";
import MyTime from "../MyTime/MyTime.jsx";
const { Title } = Typography
const App = () => {
    const [percent, setPercent] = useState(0);
    const title = '等待队列';
    const notices = [
        // 提示信息
        {
            id: 1,
            content:
                '用电高峰期，您的开机请求可能无法立即满足，请您耐心等待',
        },
        {
            id: 2,
            content:
                '如您无法等待，可随时取消开机申请',
        },
    ];
    return (
        <>
            <PageHeader title={title} notices={notices} />
            <ProCard
                gutter={[16, 16]}
                title="Waiting List"
                colSpan="80%"
                split="vertical"
            >
                <ProCard
                    colSpan={8}
                    title="当前等待人数"
                    bordered
                    style={{ height: '150px' }}
                >
                    {/* 内容 */}
                </ProCard>
                <ProCard
                    colSpan={16}
                    title="等待进度"
                    bordered
                    style={{ height: '150px' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Progress percent={percent} status="active" style={{ width: '80%' }} />
                    </div>
                </ProCard>
            </ProCard>
            <Button type="primary" style={{ float: 'right', marginTop: '20px'}} size="large">取消开机</Button>
        </>
    )
};
export default App;