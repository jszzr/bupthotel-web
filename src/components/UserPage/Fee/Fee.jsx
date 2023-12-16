import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, Input, Typography} from 'antd';
import PageHeader from "../../Common/Header.jsx";
import React, { useEffect, useState } from 'react';
const { Title } = Typography
const valueEnum = {
    0: 'close',
    1: 'online',
    2: 'error',
};
import { API_URL } from '../../constants';

const tableListDataSource = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
        key: i,
        name: '404',
        containers: Math.floor(Math.random() * 20),
        creator: creators[Math.floor(Math.random() * creators.length)],
        status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '')],
        createdAt: Date.now() - Math.floor(Math.random() * 2000),
        money: Math.floor(Math.random() * 2000) * i,
        progress: Math.ceil(Math.random() * 100) + 1,
        memo: i % 2 === 1
            ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
            : '简短备注文案',
    });
}

const columns = [
    {
        title: '排序',
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '房间号',
        dataIndex: 'name',
        render: (_) => <a>{_}</a>,
        filterDropdown: () => (
            <div style={{ padding: 8 }}>
                <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
    },
    {
        title: '消费金额',
        dataIndex: 'money', // 将数据索引修改为 'money'
        valueEnum: {
            all: { text: '全部' },
            0: { text: '0' }, // 你可以根据实际需求调整消费金额的选项
            1000: { text: '1000' }, // 例如，这里使用了 0 和 1000 作为选项
            2000: { text: '2000' },
            3000: { text: '3000' },
            4000: { text: '4000' },
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            close: { text: '未支付', status: 'Default' },
            online: { text: '已支付', status: 'Success' },
            error: { text: '异常', status: 'Error' },
        },
    },
    {
        title: '备注',
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
    },
    {
        title: '操作',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: () => [
            <a key="link" href="/me">计费规则</a>, // 添加 href 属性
            <a key="link2" href="/help">帮助</a>, // 添加 href 属性
        ],
    },
];

const Fee = () => {
    const [percent, setPercent] = useState(0);
    const title = '费用详情';
    const notices = [
        // 提示信息
        {
            id: 1,
            content:
                '针对未完成支付的订单，请您尽快支付，避免影响正常使用',
        },
        {
            id: 2,
            content:
                '如您对费用有任何疑问，请点击按钮查看计费规则',
        },
    ];
    return (
        <>
            <PageHeader title={title} notices={notices} />
            <ProTable
                columns={columns}
                request={(params, sorter, filter) => {
                    console.log(params, sorter, filter);
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true,
                    });
                }}
                rowKey="key"
                pagination={{
                    showQuickJumper: true,
                }}
                search={false}
                dateFormatter="string"
                toolbar={{
                    title: '费用详情',
                    tooltip: '更详细的计费请查看账单',
                }}
            />
        </>
    );
};
export default Fee;