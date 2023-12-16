import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import {
    AlipayCircleOutlined,
    PlusOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText,
} from '@ant-design/pro-components';
import {message } from 'antd';
import { useState } from 'react';
import { API_URL } from '../../constants';

const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export default function Register() {
    const onFinish = (values) => {
        console.log("Received values of form: ");
        console.log(values);
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
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'用户名: admin or user'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码: ant.design'}
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
}
