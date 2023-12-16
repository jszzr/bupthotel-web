import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';
import {useGuestNameContext} from "../Context/GuestNameContext.jsx";
import { API_URL } from '../../constants';

const Bill_Cost = () => {
    const [data, setData] = useState(null);
    const { guestName } = useGuestNameContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,

                    redirect: 'follow',
                };

                // 使用 guestName 作为查询参数
                const queryParams = new URLSearchParams({
                    guest_name: guestName,
                });

                const response = await fetch(
                    `${API_URL}/bill_cost?${queryParams.toString()}`,
                    requestOptions
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        // 仅当 guestName 非空时发起请求

            fetchData();


    },  [guestName]);

    const renderItems = () => {
        if (!data) {
            return null;
        }

        // Modify this part based on the actual structure of your 'Request' type
        return [
            {
                key: 'room_id',
                label: 'Room ID',
                children: data.room_id,
            },
            {
            key: 'check_in_time',
            label: 'Check-in Time',
            children: data.check_in_time,
            },
            {
            key: 'check_out_time',
            label: 'Check-out Time',
            children: data.check_out_time,
            },
            {
            key: 'total_cost',
            label: 'Total Cost',
            children: data.total_cost.toFixed(2),
            },
            // Add more items based on your 'Request' type structure
        ];
    };

    return (
        <Descriptions title={`User: ${guestName} INFO`} bordered items={renderItems(guestName)} />
        // <Descriptions title={guestName} bordered items={renderItems()} />
    );
};

export default Bill_Cost;
