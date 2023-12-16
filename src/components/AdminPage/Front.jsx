import React, {useState} from 'react';
import { ProCard } from '@ant-design/pro-components';
import PageHeader from "../Common/Header.jsx";
import {Button, Input, InputNumber, message, Select, Statistic, Switch, Typography} from "antd";
import { Slider } from 'antd';
import {PoweroffOutlined} from "@ant-design/icons";
import {useGuestNameContext} from "../Context/GuestNameContext.jsx";
import { useNavigate } from 'react-router-dom';
import {useRoomContext} from "../Context/RoomContext.jsx";
import { API_URL } from '../../constants';

const { Title } = Typography

const RoomMonitor = () => {
    const title = '酒店前台';
    const notices = [
        // 提示信息
        {
            id: 1,
            content:
                '前台具有打印账单和详单功能',
        },
        {
            id: 2,
            content:
                '请您妥善处理客户有关费用的疑问',
        },
    ];
    const { guestName, setGuestName } = useGuestNameContext();
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setGuestName(inputValue);
    };

    const handleConfirmClick = () => {
        setGuestName(inputValue);
        // 发送请求
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "guest_name": inputValue });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_URL}/check_in?room_id=${roomNumber}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.status === 'success!') {
                    message.success('Checkin 成功！');
                } else {
                    message.error('Checkin 失败，请重试。');
                }
            })
            .catch(error => {
                console.log('error', error);
                message.error('网络错误，Checkin 失败。');
            });
    };
    const {roomNumber, setRoomNumber,} = useRoomContext();
    const handleCheckOutClick = () => {
        setGuestName(''); // 清空 guestName

        // 发送请求
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "guest_name": inputValue });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_URL}/check_out?room_id=${roomNumber}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.status === 'success!') {
                    message.success('Checkout 成功！');
                } else {
                    message.error('Checkout 失败，请重试。');
                }
            })
            .catch(error => {
                console.log('error', error);
                message.error('网络错误，Checkout 失败。');
            });
    };

    const navigate = useNavigate(); // 使用 useNavigate 钩子

    // 处理跳转到 Bill_Cost 页面的函数
    const handleBillCostClick = () => {
        // 使用 navigate 进行跳转并传递状态
        navigate('/AdminPage/Bill_Cost', { state: { guestName } });
    };

    const handleBillDetailClick = () => {
        // 使用 navigate 进行跳转并传递状态
        navigate('/AdminPage/Bill_Detail', { state: { guestName } });
    };

    return (
        <>
            <PageHeader title={title} notices={notices} />
            <ProCard gutter={8} title="酒店前台" style={{ marginBlockStart: 8 }}>
                <ProCard>
                    <InputNumber
                        min={1}
                        max={1000}
                        defaultValue={101}
                        onChange={(value) => setRoomNumber(value)}
                        style={{ marginLeft: '10px' }}
                    />
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="请输入访客姓名"
                    />
                    <Button type="primary" onClick={handleConfirmClick} style={{ marginTop: '20px' }}>
                        Check In
                    </Button>
                    <Button type="primary" onClick={handleCheckOutClick} style={{ marginTop: '20px', marginLeft: '10px' }}>
                        Check Out
                    </Button>
                    {guestName && <p>当前访客姓名：{guestName}</p>}
                </ProCard>
                <ProCard>
                    <div style={{ marginBottom: '22px' }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleBillCostClick}
                        >
                            打印账单
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleBillDetailClick}
                        >
                            打印详单
                        </Button>
                    </div>
                </ProCard>
            </ProCard>



        </>
    );

};

export default RoomMonitor;
