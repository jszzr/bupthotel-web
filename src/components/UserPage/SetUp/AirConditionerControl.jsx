import React, { useEffect, useState } from 'react';
import {Button, Card, Slider, Statistic, Row, Col, Divider, Typography, InputNumber} from 'antd';
import { UpOutlined, DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import acImage from '../../../images/ac.png';
import PageHeader from "../../Common/Header.jsx";
import { useAirConditioner } from '../../Context/AirConditionerContext.jsx';
import {ProCard} from "@ant-design/pro-components";
import { Select } from 'antd';
import { useLocation } from 'react-router-dom';
const { Title } = Typography;


function AirConditionerControl() {

  const [loadings, setLoadings] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRoomNumber = queryParams.get('roomNumber');
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber);

  useEffect(() => {
    setRoomNumber(initialRoomNumber);
  }, [initialRoomNumber]);


  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  const sendRequest = (command, args) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ command, args }),
      redirect: 'follow'
    };

    fetch(`http://10.129.34.22:8080/remote_control?device_id=${roomNumber}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setApiResponse(result); // 更新响应
        console.log(result);

        // 根据返回的status值进行处理
        if (result.status === "success!") {
          // 处理成功的情况
          console.log('请求成功');
          message.success('请求成功'); 
        } else if (result.status === "failed!") {
          // 处理失败的情况
          alert("请求失败，请重试！"); // 显示错误消息弹窗
        }
      })
      .catch(error => console.log('error', error));
  };
//   const sendRequest = (command, args) => {
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ command, args }),
//       redirect: 'follow'
//     };

//   fetch("/remote_control?device_id=1", requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       setApiResponse(result); // 更新响应
//       console.log(result);

//       // 根据返回的status值进行处理
//       if (result.status === "success!") {
//         // 处理成功的情况
//        console.log('请求成功');
//       } else if (result.status === "failed!") {
//         // 处理失败的情况
//         alert("请求失败，请重试！"); // 显示错误消息弹窗
//       }
//     })
//     .catch(error => console.log('error', error));
// };

  const handleTurnOn = () => {
    sendRequest("turn_on", {
      "current_room_temp": roomTemp,
      "target_temp": desiredTemp,
      "speed": fanSpeed
    });
  };
    const handleTurnOff = () => {
    sendRequest("turn_off", {

    });
  };


  const handleDesiredTempRequest = () => {
      sendRequest("set_temperature", {
      "target_temp": desiredTemp,
    });
  };

  const handleFanSpeedRequest = () => {
    sendRequest("set_speed", {
      "speed": fanSpeed
    });
  };


  // 当目标温度或风速改变时调用
  const handleTemperatureChange = (value) => {
    setDesiredTemp(value);
    // sendRequest("set_temperature", { "target_temp": value });
  };

  const handleFanSpeedChange = (value) => {
    setFanSpeed(value);
    // sendRequest("set_speed", { "speed": value });
  };
  const [roomTemp, setRoomTemp] = useState(20.0);  // 环境温度
  const [desiredTemp, setDesiredTemp] = useState(24);  // 目标温度
  const [fanSpeed, setFanSpeed] = useState('low');  // 风速

  const tmp_marks_cool = {
    16: '16°C',
    24: '24°C',
    30: '30°C',
  };

  const tmp_marks_hot = {
    24: '24°C',
    28: '28°C',
    30: '30°C',
  };

  const fan_marks = {
    1: '低风速',
    3: '高风速',
  };

  const title = '空调开机';

  const notices = [
    // 提示信息
    {
      id: 1,
      content:
          '为践行“节约能源，绿色北京”理念，空调温度的设置范围为16-30度',
    },
    {
      id: 2,
      content:
          '用电高峰期，您的开机请求可能无法立即满足，请您耐心等待',
    },
  ];
  const [apiResponse, setApiResponse] = useState('');


    // 构建请求体
    const raw = JSON.stringify({
      "command": "set_speed",
      "args": [fanSpeed === 1 ? "low" : "high"]
    });

    // 设置请求选项


  return (
      <div>
        <PageHeader title={title} notices={notices} />
        <div>
          <div>API Response: {apiResponse}</div>
          <img src={acImage} alt="Air Conditioner" style={{ width: '100%', maxWidth: '100%', height: 'auto' }} />
          <Row gutter={16} style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
            <Col span={24}>
              <Title level={2} style={{ textAlign: 'center' }}>Air Conditioner Control</Title>
              <Divider />
            </Col>
            <ProCard
                tabs={{
                  type: 'card',
                }}
            >
              <ProCard.TabPane key="tab1" tab="制冷模式">
                <Row>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Room Temperature</Title>
                        <InputNumber
                          min={0}
                          max={40}
                          value={roomTemp}
                          onChange={(value) => setRoomTemp(value)}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Desired Temperature</Title>
                        <Slider
                          min={16}
                          max={28}
                          onChange={(value) => handleTemperatureChange(value)}
                          value={desiredTemp}
                          marks={{ 16: '16°C', 20: '20°C', 24: '24°C', 28: '28°C' }}
                        />
                        <Button
                          type="primary"
                          onClick={handleDesiredTempRequest}
                        >
                          确认设定温度
                        </Button>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Fan Speed</Title>
                        <Select defaultValue={fanSpeed} style={{ width: 120 }} onChange={(value) => handleFanSpeedChange(value)}>
                          <Option value="low">Low</Option>
                          <Option value="mid">Middle</Option>
                          <Option value="high">High</Option>
                        </Select>
                        <Button
                          type="primary"
                          onClick={handleFanSpeedRequest}
                        >
                          确认设定风速
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Col span={24}>
                  <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
                      <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        size={'large'}
                        onClick={handleTurnOn}
                      >
                        Turn On
                      </Button>
                      <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        size={'large'}
                        onClick={handleTurnOff}
                        style={{ marginTop: '16px' }}
                      >
                        Turn Off
                      </Button>
                    </div>
                  </Card>
                </Col>

              </ProCard.TabPane>
              <ProCard.TabPane key="tab2" tab="制热模式">
                <Row>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Room Temperature</Title>
                        <InputNumber
                          min={0}
                          max={40}
                          value={roomTemp}
                          onChange={(value) => setRoomTemp(value)}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Desired Temperature</Title>
                        <Slider
                          min={20}
                          max={30}
                          onChange={(value) => handleTemperatureChange(value)}
                          value={desiredTemp}
                          marks={{ 20: '20°C', 24: '24°C', 28: '28°C', 30: '30°C' }}
                        />
                        <Button
                          type="primary"
                          onClick={handleDesiredTempRequest}
                        >
                          确认设定温度
                        </Button>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Fan Speed</Title>
                        <Select defaultValue={fanSpeed} style={{ width: 120 }} onChange={(value) => handleFanSpeedChange(value)}>
                          <Option value="low">Low</Option>
                          <Option value="mid">Mid</Option>
                          <Option value="high">High</Option>
                        </Select>
                        <Button
                          type="primary"
                          onClick={handleFanSpeedRequest}
                        >
                          确认设定风速
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Col span={24}>
                  <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
                      <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        size={'large'}
                        onClick={handleTurnOn}
                      >
                        Turn On
                      </Button>
                      <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        size={'large'}
                        onClick={handleTurnOff}
                        style={{ marginTop: '16px' }}
                      >
                        Turn Off
                      </Button>
                    </div>
                  </Card>
                </Col>
              </ProCard.TabPane>
            </ProCard>

            {/*<Col span={24}>*/}
            {/*  <Card>*/}
            {/*    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>*/}
            {/*      <Button*/}
            {/*          type="primary"*/}
            {/*          icon={<PoweroffOutlined />}*/}
            {/*          size={'large'}*/}
            {/*          loading={loadings[1]}*/}
            {/*          onClick={handleTurnOn}*/}
            {/*      >*/}
            {/*        Turn On*/}
            {/*      </Button>*/}
            {/*    </div>*/}
            {/*  </Card>*/}
            {/*</Col>*/}
          </Row>
        </div>
      </div>
  );
}

export default AirConditionerControl;
