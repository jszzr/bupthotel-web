import React, { useState } from 'react';
import {Button, Card, Col, Row, Slider, Space, Statistic, Typography} from 'antd';
import {
    AlipayCircleOutlined,
    DownOutlined, LockOutlined,
    TaobaoCircleOutlined,
    UpOutlined, UserOutlined,
    WeiboCircleOutlined
} from "@ant-design/icons";
import {LoginForm, ProCard, ProFormSelect, ProFormText} from "@ant-design/pro-components";
const { Title } = Typography;



export default () => {
    const [desiredTemp, setDesiredTemp] = useState(24);
    const [fanSpeed, setFanSpeed] = useState(1);
    const [roomTemp, setRoomTemp] = useState(24);

    const tmp_marks_cool = {
        16: '16°C',
        24: '24°C',
        30: '30°C',
    };

    const tmp_marks_hot = {
        24: '24°C',
        28: '28°C',
        30: '30°C',
    };

    const fan_marks = {
        1: '低风速',
        3: '高风速',
    };
    return (
        <>
            <LoginForm
                title="BuptHotel"
                subTitle="欢迎光临BuptHotel，我们将竭诚为您服务！"
                actions={
                    <Space>
                        其他登录方式
                        <AlipayCircleOutlined style={iconStyles} />
                        <TaobaoCircleOutlined style={iconStyles} />
                        <WeiboCircleOutlined style={iconStyles} />
                    </Space>

                }

            >
                <ProFormSelect
                    name="RoomNumber"
                    label="Select"
                    valueEnum={{
                        101: '101',
                        102: '102',
                        103: '103',
                        201: '201',
                        202: '202',
                        203: '203',
                        404: '404',
                    }}
                    placeholder="请选择您入住的房间"
                    rules={[{ required: true, message: '请选择房间号!' }]}
                />

                <ProFormText
                    name="PhoneNumber"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'手机号'}
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号!',
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: '手机号格式错误！',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
            </LoginForm>
        </>
    );
};