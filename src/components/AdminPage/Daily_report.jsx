import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';

const Daily_report = () => {
    const [data, setData] = useState(null);
    const { date } = useParams(); // 使用路由参数获取日期
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryDate = searchParams.get('date'); // 使用查询参数获取日期

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
                myHeaders.append('Content-Type', 'application/json'); // 添加 Content-Type

                const raw = JSON.stringify({
                    date: date || queryDate, // 使用路由参数或查询参数中的日期
                  });

                const requestOptions = {
                    method: 'POST',  // 修改为POST请求
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                };

                const response = await fetch(
                    `${API_URL}/get_daily_report`,
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
    }, [date, queryDate]);

    const renderItems = () => {
        if (!data) {
            return null;
        }

        return data.room_list.map(room => (
            <div key={room.room_id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <p>Room ID: {room.room_id}</p>
                <p>Daily Cost: {room.daily_cost}</p>
                <p>Bill Times: {room.bill_times}</p>
                <p>Scheduled Times: {room.sched_times}</p>
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

export default Daily_report;
