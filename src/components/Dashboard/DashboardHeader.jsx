import React from 'react';
import {Avatar, Statistic} from 'antd';
import {DefaultAvatar} from '../../utils/Resource.jsx'; // 工作台 Header


import { useRoomContext } from '../Context/RoomContext.jsx';
// 问候语
function generateHelloWord(name) {
    let hour = new Date().getHours();
    let hello;
    if (hour > 22) {
        hello = '夜深了，' + name + '，请享受宁静的夜晚，好梦 ~';
    } else if (hour > 18) {
        hello = '晚上好，' + name + '，欢迎回到酒店，需要什么帮助吗？';
    } else if (hour > 14) {
        hello = '下午好，' + name + '，酒店设施等着您，尽情享受吧 ~';
    } else if (hour > 11) {
        hello = '中午好，' + name + '，酒店餐厅提供美味的午餐，欢迎光临！';
    } else if (hour > 6) {
        hello = '早上好，' + name + '，酒店祝您新的一天充满活力！';
    } else if (hour > 3) {
        hello = 'OH MY GOD，' + name + '，这个时候您还没休息吗？酒店会照顾您的舒适睡眠。';
    } else {
        hello = '打扰了，' + name + '，这个时候不是应该入睡的时候吗？酒店随时为您提供服务。';
    }
    return hello;
}


// 工作台 Header
const DashboardHeader = () => {

    // 使用自定义 hook 获取房间上下文
    const { roomNumber } = useRoomContext();

    // 获取已选的房间号
    const selectedRoomNumber = roomNumber;
    // 问候语
    let hello = generateHelloWord('吴彦祖');

    // 面包屑
    const items = [
        { label: '菜单项一', key: 'item-1' },
        { label: '菜单项二', key: 'item-2' },
    ];

    return (
        <>
            <div className="admin-ph">
                <div className="admin-ph-left">
                    <div className="admin-ph-avatar">
                        <Avatar src={DefaultAvatar} size={60} />
                    </div>
                    <div className="admin-ph-info">
                        <div className="admin-ph-welcome">{hello}</div>
                        <div className="admin-ph-desc">
                            {selectedRoomNumber ? `波普特酒店 | ${selectedRoomNumber}房间` : '波普特酒店'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;
