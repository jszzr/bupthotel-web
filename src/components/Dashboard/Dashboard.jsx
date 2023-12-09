import React, {useEffect, useState} from 'react';
import DashboardHeader from "./DashboardHeader.jsx";
import "./Dashboard.css"
import {
    ProCard,
} from '@ant-design/pro-components';
import MyTime from "../MyTime/MyTime.jsx";
import {Button, Progress} from "antd";
import { useAirConditioner } from '../Context/AirConditionerContext';
import {PoweroffOutlined} from "@ant-design/icons";
import {useRoomContext} from "../Context/RoomContext.jsx";
import {useNavigate} from "react-router";
import { useLocation } from 'react-router-dom';



// 仪表盘工作台
const Dashboard = () => {
    // const { airConditionerSettings } = useAirConditioner();
    const [airConditionerSettings, setAirConditionerSettings] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialRoomNumber = queryParams.get('roomNumber');
    const [roomNumber, setRoomNumber] = useState(initialRoomNumber);
    const navigate = useNavigate();

    const handleTurnOn = () => {
        navigate(`/UserPage/SetUp?roomNumber=${roomNumber}`);
      };
    
    const handleTurnOff = () => {
        navigate(`/UserPage/SetUp?roomNumber=${roomNumber}`);
      };

    // 获取已选的房间号
    useEffect(() => {
        const storedRoomNumber = localStorage.getItem('roomNumber');
        const currentRoomNumber = storedRoomNumber || roomNumber;
        localStorage.setItem('roomNumber', currentRoomNumber);

        const interval = setInterval(() => {
            
            // fetch(`http://127.0.0.1:4523/m1/3693748-0-default/get_device_status?device_id=${currentRoomNumber}`)
            fetch(`http://10.129.34.22:8080/get_device_status?device_id=${currentRoomNumber}`)
                .then(response => response.json())
                .then(data => setAirConditionerSettings(data))
                .catch(error => console.error('Error fetching data:', error));
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [roomNumber]); // 添加房间号到依赖数组中



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
                    <ProCard colSpan="80" title={`我的房间: ${roomNumber}`} boxShadow></ProCard>
                    <ProCard colSpan="99%" title="当前时间" headerBordered bordered boxShadow>
                        <div style={{ width: '100%' }}>
                            <MyTime style={{ height: 100, width: 100 }} />
                        </div>
                    </ProCard>
                    <ProCard colSpan="99%" title="等待状态" headerBordered bordered boxShadow>
                        <Progress type="circle" />
                    </ProCard>
                    <ProCard colSpan="99%" title="费用情况" headerBordered bordered boxShadow>
                        <p>本次使用费用：{airConditionerSettings.total_cost}元</p>
                        {/*<p>累计费用：{airConditionerSettings.totalCost}元</p>*/}
                    </ProCard>
                </ProCard>
                <ProCard title= "空调状态" headerBordered>
                    <div style={{ height: 360 }}>
                        <h3>当前空调设置：</h3>
                        <p>期望温度：{airConditionerSettings.target_temperature}°C</p>
                        <p>风速：{airConditionerSettings.fanSpeed ? '开启' : '关闭'}</p>
                        <p>环境温度：{airConditionerSettings.env_temperature}°C</p>
                        <p>工作模式：{airConditionerSettings.mode ? '制冷模式' : '制热模式'}</p>
                    </div>
                    <Button type="primary" icon={<PoweroffOutlined />}
                            style={{ float: 'left', margin: '50px 0px 10px 120px'}} size="large" onClick={handleTurnOn}>
                        Turn On
                    </Button>
                    <Button type="primary" icon={<PoweroffOutlined />}
                            style={{ float: 'right', margin: '50px 50px 100px 10px'}} size="large" onClick={handleTurnOff}>
                        Turn Off
                    </Button>
                </ProCard>
            </ProCard>
        </>
    );
};

export default Dashboard;
