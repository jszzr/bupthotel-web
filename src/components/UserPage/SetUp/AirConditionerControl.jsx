import { useState } from 'react'
import { Button, Card, Slider, Statistic, Row, Col, Typography, Divider } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import acImage from '../../../images/ac.png'
import PageHeader from "../../Common/Header.jsx";
const { Title } = Typography

function AirConditionerControl() {
  const [desiredTemp, setDesiredTemp] = useState(24)
  const [fanSpeed, setFanSpeed] = useState(1)
  const [roomTemp, setRoomTemp] = useState(24)
  const tmp_marks = {
    16: '16°C',
    24: '24°C',
    30: '30°C',
  }
  const fan_marks = {
    1: '低风速',
    3: '高风速',
  }
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
  return (
    <div>
      <PageHeader title={title} notices={notices} />
      <divs>
        <img src={acImage} alt="Air Conditioner" style={{ width: '100%', maxWidth: '100%', height: 'auto' }} />
        <Row gutter={16} style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
          <Col span={24}>
            <Title level={2} style={{ textAlign: 'center' }}>Air Conditioner Control</Title>
            <Divider />
          </Col>
          <Col span={8}>
            <Card>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}> {/* 设置最小高度 */}
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
                  marks={tmp_marks}
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
                  marks = {fan_marks}
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
      </divs>
    </div>
  )
}

export default AirConditionerControl