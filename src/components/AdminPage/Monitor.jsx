import React, {useEffect, useState} from 'react';
import { ProCard } from '@ant-design/pro-components';
import PageHeader from "../Common/Header.jsx";
import {Button, Card, Col, InputNumber, Row, Statistic, Switch, Typography} from "antd";
import { Slider ,DatePicker, Space} from 'antd';
import {DownOutlined, PoweroffOutlined, UpOutlined} from "@ant-design/icons";

const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
};
const { Title } = Typography

const markscool = {
    16: {
        style: {
            color: '#1890ff',
        },
        label: '16°C',
    },
    24: '24°C',
};
const markshot = {
    22: '22°C',
    28: {
        style: {
            color: '#f50',
        },
        label: '28°C',
    },
};
const RoomMonitor = () => {
    const title = '中控室';
    const notices = [
        // 提示信息
        {
            id: 1,
            content:
                '中控室具有10个屏幕实时监测房间的运行参数',
        },
        {
            id: 2,
            content:
                '请您及时处理可能出现的空调异常情况',
        },
    ];
    const [isCooling, setIsCooling] = useState(true);
    const [isHeating, setIsHeating] = useState(true);
    const [confirmCooling, setConfirmCooling] = useState(false);
    const [confirmHeating, setConfirmHeating] = useState(false);
    const [rateValue, setRateValue] = useState(3);
    const [sliderValue, setSliderValue] = useState([18, 20]);

    const onChange = (value) => {
        setSliderValue(value);
    };



    const onSwitchChange = (checked, type) => {
        if (type === 'cooling') {
            setIsCooling(checked);
            setConfirmCooling(false);
        } else if (type === 'heating') {
            setIsHeating(checked);
            setConfirmHeating(false);
        }
    };

    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);

    };


    const handleConfirm = async (type) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
          myHeaders.append('Content-Type', 'application/json');
          console.log(myHeaders);
          let command;
          let mode1;
      
          if (type === 'cooling') {
            command = 'set_mode';
            mode1 = 'cool'; // 1 表示制冷模式
          } else if (type === 'heating') {
            command = 'set_mode';
            mode1 = 'warm'; // 2 表示制热模式
          }
      
          const rawMode = JSON.stringify({
            command: command,
            args: { mode: mode1 },
          });
      
          const requestOptionsMode = {
            method: 'POST',
            headers: myHeaders,
            body: rawMode,
            redirect: 'follow',
          };
      
          const responseMode = await fetch('http://10.129.34.22:8080/admin_control', requestOptionsMode);
      
          if (!responseMode.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Parse the response if needed
          const resultMode = await responseMode.json();
          console.log(resultMode);
        } catch (error) {
          console.error('Error handling confirm:', error);
        }
      };
      
      const handleSliderConfirm = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
          myHeaders.append('Content-Type', 'application/json');
      
          const rawValidRange = JSON.stringify({
            command: 'set_valid_range',
            args: { valid_range_low: sliderValue[0], valid_range_high: sliderValue[1] },
          });
      
          const requestOptionsValidRange = {
            method: 'POST',
            headers: myHeaders,
            body: rawValidRange,
            redirect: 'follow',
          };
      
          const responseValidRange = await fetch('http://10.129.34.22:8080/admin_control', requestOptionsValidRange);
          console.log(responseValidRange);
          if (!responseValidRange.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Parse the response if needed
          const resultValidRange = await responseValidRange.json();
          console.log(resultValidRange);
        } catch (error) {
          console.error('Error handling slider confirm:', error);
        }
      };

    const handleSetRate = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
            myHeaders.append('Content-Type', 'application/json');

            const rawSetRate = JSON.stringify({
                command: 'set_price',
                args: {'fee_rate' : rateValue},
            });

            const requestOptionsSetRate = {
                method: 'POST',
                headers: myHeaders,
                body: rawSetRate,
                redirect: 'follow',
            };

            const responseSetRate = await fetch('http://10.129.34.22:8080/admin_control', requestOptionsSetRate);

            if (!responseSetRate.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response if needed
            const resultSetRate = await responseSetRate.json();
            console.log(resultSetRate);
        } catch (error) {
            console.error('Error setting rate:', error);
        }
    };

    const handleSwitch = async (checked, type) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');
            myHeaders.append('Content-Type', 'application/json');

            let command;

            if (checked) {
                // 设置 turn_on 请求
                command = 'turn_on';
                console.log('Sending turn_on request...');

            } else {
                // 设置 turn_off 请求
                command = 'turn_off';
                console.log('Sending turn_off request...');
            }

            const raw = JSON.stringify({
                command: command,
                args: {},
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            const response = await fetch('http://10.129.34.22:8080/admin_control', requestOptions);
            if (response.status === 'success!') {
                message.success('Checkin 成功！');
            } else {
                message.error('Checkin 失败，请重试。');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response if needed
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error handling switch:', error);
        }
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState(null);
  
    const handlePrintDailyReport = () => {
      if (selectedDate) {
        window.location.href = `/AdminPage/Daily_report?date=${selectedDate.format('YYYY-MM-DD')}`;
      }
    };
  
    const handlePrintWeeklyReport = () => {
      if (selectedDateRange) {
        const startDate = selectedDateRange[0].format('YYYY-MM-DD');
        const endDate = selectedDateRange[1].format('YYYY-MM-DD');
        window.location.href = `/AdminPage/Weekly_report?startDate=${startDate}&endDate=${endDate}`;
      }
    };

    const [roomData, setRoomData] = useState(null);



    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)');

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                };

                const response = await fetch('http://10.129.34.22:8080/get_all_device_status', requestOptions);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the response using the toResponse conversion function
                const result = await response.json();
                console.log(result)
                setRoomData(result.device_list);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        // Call the fetchRoomData function when the component mounts
        fetchRoomData();
    }, []);
    // 模拟房间数据

    return (
        <>
            <PageHeader title={title} notices={notices} />
            <ProCard colSpan={16}  bordered>
                <div style={{ marginBottom: '22px' ,marginLeft: '200px'}}>
                    <Switch
                        size="large"
                        checkedChildren="开机"
                        unCheckedChildren="关机"
                        defaultChecked={isCooling}
                        onChange={(checked) => {
                            onSwitchChange(checked, 'cooling');
                            handleSwitch(checked, 'cooling');
                        }}
                    />
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={3}
                        onChange={(value) => setRateValue(value)}
                        style={{ marginLeft: '10px' }}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSetRate}
                        style={{ marginLeft: '10px' }}
                    >
                        设置费率
                    </Button>
                </div>

            </ProCard>
            <ProCard
                gutter={8}
                title="设置空调工作模式"
                style={{ marginBlockStart: 8 }}
                tabs={{
                    type: 'card',
                }}
            >
                <ProCard.TabPane key="tab1" tab="制冷模式">
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => handleConfirm('cooling')}
                        disabled={!isCooling}
                        style={{ marginBottom: '10px' }}
                        >
                        开始制冷
                    </Button>
                    <Slider
                        disabled={!isCooling}
                        defaultValue={[18, 20]}
                        min={16}
                        max={24}
                        range
                        marks={markscool}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSliderConfirm}
                        disabled={!isCooling}
                        style={{ marginTop: '10px' }}
                    >
                        确认温度区间
                    </Button>
                </ProCard.TabPane>
                <ProCard.TabPane key="tab2" tab="制热模式">
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => handleConfirm('heating')}
                        disabled={!isCooling || confirmCooling}
                        style={{ marginBottom: '10px' }}
                        >
                        开始制热
                    </Button>
                    <Slider
                        disabled={!isCooling}
                        range
                        marks={markshot}
                        defaultValue={[24,26]}
                        min={22}
                        max={28}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSliderConfirm}
                        disabled={!isCooling || confirmCooling}
                        style={{ marginTop: '10px' }}
                    >
                        确认温度区间
                    </Button>
                </ProCard.TabPane>
            </ProCard>

            <div style={{ marginBottom: '22px', marginLeft: '200px' }}>
                <Space>
                    <DatePicker
                        onChange={(date) => setSelectedDate(date)}
                        placeholder="选择日期"
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handlePrintDailyReport}
                        disabled={!selectedDate}
                    >
                        打印日报
                    </Button>
                    </Space>
                </div>
                <div style={{ marginBottom: '22px', marginLeft: '200px' }}>
                    <Space>
                    <DatePicker.RangePicker
                        onChange={(dates) => setSelectedDateRange(dates)}
                        placeholder={['开始日期', '结束日期']}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handlePrintWeeklyReport}
                        disabled={!selectedDateRange}
                    >
                        打印周报
                    </Button>
                </Space>
            </div>
            <ProCard
                title="房间空调运行情况"
                bordered
                headerBordered
                direction="column"
                gutter={[0, 16]}
                style={{ marginBlockStart: 8 }}
            >
                {roomData && roomData.map((room, index) => (
                    index % 2 === 0 ? (
                        <ProCard key={index} gutter={[16, 0]}>
                            {[index, index + 1].map(i => {
                                const currentRoom = roomData[i];
                                return (
                                    currentRoom ? (
                                        <ProCard
                                            key={i + 1}
                                            title={`房间 ${currentRoom.room_id}`}
                                            type="inner"
                                            bordered
                                            colSpan={currentRoom ? 12 : 24}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Statistic title="当前室温" value={currentRoom.env_temperature} suffix="°C" />
                                                <Statistic title="目标温度" value={currentRoom.target_temperature} suffix="°C" />
                                                <Statistic title="风速" value={currentRoom.speed} />
                                                <Statistic title="总费用" value={currentRoom.total_cost} prefix="￥" />
                                                <Statistic title="房间ID" value={currentRoom.room_id} />
                                                <Statistic title="工作状态" checked={currentRoom.working} />
                                                <Statistic title="模式" checked={currentRoom.mode} />
                                            </div>
                                        </ProCard>
                                    ) : null
                                );
                            })}
                        </ProCard>
                    ) : null
                ))}
            </ProCard>
            {/*<ProCard*/}
            {/*    title="房间空调运行情况"*/}
            {/*    bordered*/}
            {/*    headerBordered*/}
            {/*    direction="column"*/}
            {/*    gutter={[0, 16]}*/}
            {/*    style={{ marginBlockStart: 8 }}*/}
            {/*>*/}
            {/*    {[1, 2, 3, 4, 5].map(row => (*/}
            {/*        <ProCard key={row} gutter={[16, 0]}>*/}
            {/*            {[1, 2].map(col => {*/}
            {/*                const roomIndex = (row - 1) * 2 + col;*/}
            {/*                const room = roomData[roomIndex - 1];*/}
            {/*                return (*/}
            {/*                    <ProCard key={col} title={`房间 ${room.id}`} type="inner" bordered>*/}
            {/*                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
            {/*                            <div>*/}
            {/*                                <Statistic title="当前室温" value={room.currentTemperature} suffix="°C" />*/}
            {/*                                <Statistic title="目标温度" value={room.targetTemperature} suffix="°C" />*/}
            {/*                                <Statistic title="风速" value={room.windSpeed} />*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <Statistic title="当前费用" value={room.currentCost} prefix="￥" />*/}
            {/*                                <Statistic title="累计费用" value={room.totalCost} prefix="￥" />*/}
            {/*                                <Statistic title="是否等待" value={room.isWaiting ? '是' : '否'} />*/}
            {/*                                <Statistic title="是否开机运行" value={room.isRunning ? '是' : '否'} />*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </ProCard>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </ProCard>*/}
            {/*    ))}*/}
            {/*</ProCard>*/}
        </>
    );
    // return (
    //     <Card title="中控室监控" bordered={false}>
    //         <Row gutter={16}>
    //             {roomData.map(room => (
    //                 <Col span={6} key={room.id}>
    //                     <Card>
    //                         <Statistic title={`房间 ${room.id}`} value={room.currentTemperature} suffix="°C" />
    //                         <p>目标温度: {room.targetTemperature}°C</p>
    //                         <p>风速: {room.windSpeed}</p>
    //                         <p>当前费用: {room.currentCost}元</p>
    //                         <p>累计费用: {room.totalCost}元</p>
    //                         <p>是否等待: <Tag color={room.isWaiting ? 'red' : 'green'}>{room.isWaiting ? '是' : '否'}</Tag></p>
    //                         <p>是否开机运行: <Switch checked={room.isRunning} /></p>
    //                     </Card>
    //                 </Col>
    //             ))}
    //         </Row>
    //     </Card>
    // );
};

export default RoomMonitor;
