import {LockOutlined, PoweroffOutlined, UserOutlined} from "@ant-design/icons";
import {message, Space} from "antd";
import {
    LoginForm, ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import React, {createContext, useContext} from "react";
import {  useNavigate } from "react-router-dom";
// Create a context to store the selected room number

import{useRoomContext} from "../Context/RoomContext.jsx";
// A custom hook to access the room context


// const waitTime = (time = 100) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, time);
//     });
// };


export default function Login() {
    
    const navigate = useNavigate();
    const {roomNumber, setRoomNumber,} = useRoomContext();
    const onFinish = (values) => {
        //Mock login request (replace this with your actual login request)
        const myHeaders = new Headers();

        myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                RoomNumber: values.RoomNumber,
                PhoneNumber: values.PhoneNumber,
                password: values.password,
            }),
        };

        // fetch("/login", requestOptions)
        
        // fetch('http://127.0.0.1:4523/m1/3693748-0-default/login', requestOptions)
        fetch('http://10.129.34.22:8080/login', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.status === "login success") {
                    // Login successful
                    // Store the selected room number in context
                    setRoomNumber(values.RoomNumber);

                    // Redirect based on RoomNumber
                    if (values.RoomNumber === '404') {
                        navigate("/AdminPage/Monitor"); // Redirect to /monitor for admin
                    } else if (values.RoomNumber === '256') {
                        navigate("/AdminPage/Front"); // Redirect to /front for front
                    } else {
                        navigate(`/dashboard?roomNumber=${values.RoomNumber}`);
                        
                        // navigate("/dashboard", { state: { roomNumber } }); // Redirect to /dashboard for other room numbers
                    }
                } else {
                    // Login failed
                    message.error("Login failed. Please check your credentials.");
                }
            })

            .catch((error) => {
                    console.error("Login error:", error);
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error("Server error response:", error.response.data);
                        console.error("Status code:", error.response.status);
                        console.error("Headers:", error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error("No response received. Request details:", error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error("Error setting up the request:", error.message);
                    }
                message.error("An error occurred during login. Please try again.");
            });
    };
    return (
        <>
            <LoginForm
                title="BuptHotel"
                subTitle="欢迎光临BuptHotel，我们将竭诚为您服务！"
                onFinish={onFinish}
                actions={
                    <Space
                        size="large"
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        <a href="/Register">
                            注册
                        </a>
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
                        404: 'admin',
                        256: 'front',
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
}
