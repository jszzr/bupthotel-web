import { useState } from 'react'
import { Button, Card, Slider, Statistic, Row, Col, Typography, Divider } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

const { Title } = Typography

function AirConditionerControl() {
  const [desiredTemp, setDesiredTemp] = useState(24)
  const [fanSpeed, setFanSpeed] = useState(1)
  const [roomTemp, setRoomTemp] = useState(24)

  return (
    <Row gutter={16} style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Col span={24}>
        <Title level={2} style={{ textAlign: 'center' }}>Air Conditioner Control</Title>
        <Divider />
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Room Temperature"
            value={roomTemp}
            suffix="°C"
            style={{ textAlign: 'center' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Title level={5}>Desired Temperature</Title>
          <Slider
            min={16}
            max={30}
            onChange={setDesiredTemp}
            value={desiredTemp}
          />
          <Button.Group>
            <Button onClick={() => setDesiredTemp(desiredTemp - 1)}>
              <DownOutlined />
            </Button>
            <Button onClick={() => setDesiredTemp(desiredTemp + 1)}>
              <UpOutlined />
            </Button>
          </Button.Group>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Title level={5}>Fan Speed</Title>
          <Slider
            min={1}
            max={3}
            onChange={setFanSpeed}
            value={fanSpeed}
          />
          <Button.Group>
            <Button onClick={() => setFanSpeed(fanSpeed - 1)}>
              <DownOutlined />
            </Button>
            <Button onClick={() => setFanSpeed(fanSpeed + 1)}>
              <UpOutlined />
            </Button>
          </Button.Group>
        </Card>
      </Col>
    </Row>
  )
}

export default AirConditionerControl