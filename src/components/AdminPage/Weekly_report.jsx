import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';

const WeeklyReport = () => {
    const [data, setData] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
                myHeaders.append('Content-Type', 'application/json');

                const raw = JSON.stringify({
                    date_from: startDate,
                    date_to: endDate,
                  });

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                };

                const response = await fetch(
                    'http://127.0.0.1:4523/m1/3691356-0-default/get_range_report',
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
    }, [startDate, endDate]);

    const renderItems = () => {
        if (!data) {
            return null;
        }

        return data.room_list.map(room => (
            <div key={room.room_id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <p>Room ID: {room.room_id}</p>
                <p>Turn Times: {room.turn_times}</p>
                <p>Scheduled Times: {room.sched_times}</p>
                <p>Bill Times: {room.bill_times}</p>
                <p>tweat_tem Times: {room.tweat_tem_times}</p>
                <p>tweat_speed Times: {room.tweat_speed_times}</p>
                <p>Working Time: {room.working_time}</p>
                <p>Daily Cost: {room.daily_cost}</p>
                {/* Add more fields based on your 'RoomList' type structure */}
            </div>
        ));
    };

    return (
        <div>
            <h2>User Info</h2>
            {renderItems()}
        </div>
    );
};

export default WeeklyReport;
