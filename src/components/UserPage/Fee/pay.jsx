// generate QRcode to pay and then redict to the fee page
import React from 'react';
import {QRCode, Popover, Typography, Button} from 'antd';
import {Logo_p} from '../../../utils/Resource.jsx';
import PageHeader from "../../Common/Header.jsx";
import { API_URL } from '../../constants';

const { Title } = Typography

const src = Logo_p
const App = () => {
    const title = '扫码支付';
    const notices = [
        // 提示信息
        {
            id: 1,
            content:
                '扫码支付完成后点击按钮完成支付',
        },
        {
            id: 2,
            content:
                '如您对费用有任何疑问，可以查看费用详情',
        },
    ];
    return (
        <>
            <PageHeader title={title} notices={notices} />
            <Popover
                overlayInnerStyle={{
                    padding: 0,
                }}
                content={<QRCode value={src} bordered={false}/>}
            >
                <img
                    style={{
                        width: '250px', // 设置宽度为200px
                        height: '250px', // 设置高度为200px
                        position: 'absolute', // 设置为绝对定位
                        left: '50%', // 50% 位置是水平中心
                        top: '60%', // 50% 位置是垂直中心
                        transform: 'translate(-50%, -50%)', // 将图片中心对齐容器中心
                    }}
                    src={src}
                    alt="icon"
                />
            </Popover>
            <Button type="primary" style={{ float: 'right', margin: '380px 200px 0 0'}} size="large" href="/UserPage/Fee">支付完成</Button>
        </>
    )
};
export default App;
