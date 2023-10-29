//show the cost of the user
import React from 'react';
import { Table } from 'antd';


const columns = [
    {
        title: '房间号',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '费用',
        dataIndex: 'cost',
        key: 'cost',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
];

// 费用详情
const Fee = () => {
    // const { data, error, loading } = useRequest('/api/fee');
    // if (loading) {
    //     return <div>loading...</div>;
    // }
    // if (error) {
    //     return <div>failed to load</div>;
    // }
    // return <Table columns={columns} dataSource={data} />;
};

export default Fee;