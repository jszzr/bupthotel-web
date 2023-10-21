import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const PageNotFound = () => {
    const navigate = useNavigate();

    const goBackToDashboard = () => {
        navigate('/dashboard'); // 这里的'/dashboard'是你想返回的目标页面的路由路径
    };

    const centerStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    };

    const h1Style = {
        width: '100%',
        fontSize: '6rem',
        fontWeight: 'bold',
    };

    const pStyle = {
        width: '100%',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '15px',
        color: 'text-dark-700',
    };

    return (
        <div style={centerStyle}>
            <h1 style={h1Style}>404</h1>
            <p style={pStyle}>很抱歉，您访问的页面不存在!</p>
            <Button style={{ marginTop: '25px', margin: 'auto' }} onClick={goBackToDashboard}>
                返回 Dashboard
            </Button>
        </div>
    );
};
export default PageNotFound;
