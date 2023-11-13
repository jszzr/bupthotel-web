import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Progress, Row, Typography} from 'antd';
import PageHeader from "../../Common/Header.jsx";
import {ProCard} from "@ant-design/pro-components";
import MyTime from "../../MyTime/MyTime.jsx";
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
    useEffect(() => {
        const interval = setInterval(() => {
            if (percent < 100) {
                setPercent((prevPercent) => prevPercent + 20);
            } else {
                clearInterval(interval); // 停止加载
                // 在加载完成后进行页面跳转
                window.location.href = '/Pay'; // 替换为你要跳转的链接
            }
        }, 1000); // 1000 毫秒（1秒）加载一次五分之一的进度

        return () => {
            clearInterval(interval); // 组件卸载时清除定时器
        };
    }, [percent]);

    const startProgress = async () => {
        // 开始加载进度条
        setPercent(0);

        // 模拟发送请求，等待2秒（可根据实际情况修改）
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 请求完成后，设置进度条为100%
        setPercent(100);

        // 在加载完成后进行页面跳转
        window.location.href = '/dashboard'; // 替换为你要跳转的链接
    };

    return (
        <>
            <PageHeader title={title} notices={notices} />
            <ProCard
                gutter={[16, 16]}
                title="Waiting List"
                colSpan="80%"
                split="vertical"
            >
                <ProCard colSpan={8} title="当前等待人数" bordered style={{ height: '150px' }}>
                    <Typography.Text strong style={{ fontSize: '24px', textAlign: 'center' }}>
                        {(100 - percent) / 20}
                    </Typography.Text>
                </ProCard>
                <ProCard colSpan={16} title="等待进度" bordered style={{ height: '150px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Progress percent={percent} status="active" style={{ width: '80%' }} />
                    </div>
                </ProCard>
            </ProCard>
            <Button type="primary" style={{ float: 'right', marginTop: '20px'}} size="large" href="/UserPage/SetUp">取消开机</Button>
        </>
    )
};
export default App;