import React, { useState } from 'react';
import { Button, Card, Slider, Statistic, Row, Col, Divider, Typography } from 'antd';
import { UpOutlined, DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import acImage from '../../../images/ac.png';
import PageHeader from "../../Common/Header.jsx";
import { useAirConditioner } from '../../Context/AirConditionerContext.jsx';
import {ProCard} from "@ant-design/pro-components";

const { Title } = Typography;


function AirConditionerControl() {
  const { airConditionerSettings, setAirConditionerSettings } = useAirConditioner();
  const [loadings, setLoadings] = useState([]);

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

  const [desiredTemp, setDesiredTemp] = useState(24);
  const [fanSpeed, setFanSpeed] = useState(1);
  const [roomTemp, setRoomTemp] = useState(24);

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

  const handleTurnOn = () => {
    setAirConditionerSettings({
      ...airConditionerSettings,
      desiredTemp: desiredTemp,
      fanSpeed: fanSpeed,
    });

    // 在这里执行其他操作

    window.location.href = '/UserPage/WaitingList';
  };

  return (
      <div>
        <PageHeader title={title} notices={notices} />
        <div>
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
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
                        <Statistic
                            title="Room Temperature"
                            value={roomTemp}
                            suffix="°C"
                            style={{ textAlign: 'center' }}
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
                            max={30}
                            onChange={setDesiredTemp}
                            value={desiredTemp}
                            marks={tmp_marks_cool}
                            defaultValue={desiredTemp}
                        />
                        <Button.Group>
                          <Button onClick={() => setDesiredTemp(desiredTemp - 1)}>
                            <DownOutlined />
                          </Button>
                          <Button onClick={() => setDesiredTemp(desiredTemp + 1)}>
                            <UpOutlined />
                          </Button>
                        </Button.Group>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Fan Speed</Title>
                        <Slider
                            min={1}
                            max={3}
                            onChange={setFanSpeed}
                            value={fanSpeed}
                            marks={fan_marks}
                            defaultValue={2}
                        />
                        <Button.Group>
                          <Button onClick={() => setFanSpeed(fanSpeed - 1)}>
                            <DownOutlined />
                          </Button>
                          <Button onClick={() => setFanSpeed(fanSpeed + 1)}>
                            <UpOutlined />
                          </Button>
                        </Button.Group>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </ProCard.TabPane>
              <ProCard.TabPane key="tab2" tab="制热模式">
                <Row>
                  <Col span={8}>
                    <Card>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
                        <Statistic
                            title="Room Temperature"
                            value={roomTemp}
                            suffix="°C"
                            style={{ textAlign: 'center' }}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Desired Temperature</Title>
                        <Slider
                            min={24}
                            max={30}
                            onChange={setDesiredTemp}
                            value={28}
                            marks={tmp_marks_hot}
                            defaultValue={desiredTemp}
                        />
                        <Button.Group>
                          <Button onClick={() => setDesiredTemp(desiredTemp - 1)}>
                            <DownOutlined />
                          </Button>
                          <Button onClick={() => setDesiredTemp(desiredTemp + 1)}>
                            <UpOutlined />
                          </Button>
                        </Button.Group>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <div style={{ height: '100%' }}>
                        <Title level={5}>Fan Speed</Title>
                        <Slider
                            min={1}
                            max={3}
                            onChange={setFanSpeed}
                            value={fanSpeed}
                            marks={fan_marks}
                            defaultValue={2}
                        />
                        <Button.Group>
                          <Button onClick={() => setFanSpeed(fanSpeed - 1)}>
                            <DownOutlined />
                          </Button>
                          <Button onClick={() => setFanSpeed(fanSpeed + 1)}>
                            <UpOutlined />
                          </Button>
                        </Button.Group>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </ProCard.TabPane>
            </ProCard>

            <Col span={24}>
              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
                  <Button
                      type="primary"
                      icon={<PoweroffOutlined />}
                      size={'large'}
                      loading={loadings[1]}
                      onClick={handleTurnOn}
                  >
                    Turn On
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
  );
}

export default AirConditionerControl;
