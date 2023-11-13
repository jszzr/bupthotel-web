import React, { useState } from 'react';
import {Button, Card, Col, Row, Slider, Statistic, Typography} from 'antd';
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {ProCard} from "@ant-design/pro-components";
const { Title } = Typography;



export default () => {
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
    return (
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
    );
};