import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';
import {useGuestNameContext} from "../Context/GuestNameContext.jsx";

const Bill_Detail = () => {
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

                const queryParams = new URLSearchParams({
                    guest_name: guestName,
                });
                const response = await fetch(
                    `http://10.129.34.22:8080/bill_detail?${queryParams.toString()}`,
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

        fetchData();
    }, []);
    
    const renderItems = () => {
        if (!data) {
          return null;
        }
      
        const { room_id, detail_list } = data;
      
        return [
          {
            key: 'room_id',
            label: 'Room ID',
            children: room_id,
          },
          ...detail_list.map((detail, index) => ({
            key: String(index),
            label: `Detail ${index + 1}`,
            children: (
              <>
                <div>Request Time: {detail.request_time}</div>
                <div>Start Time: {detail.start_time}</div>
                <div>End Time: {detail.end_time}</div>
                <div>Duration: {detail.duration} seconds</div>
                <div>Speed: {detail.speed}</div>
                <div>Period Cost: ${detail.period_cost.toFixed(4)}</div>
                <div>Fee Rate: {detail.fee_rate}</div>
              </>
            ),
            span: 3, // Adjust as needed
          })),
        ];
      };

    return (
        <Descriptions title={`User: ${guestName} INFO`} bordered items={renderItems()} />
    );
};

export default Bill_Detail;
