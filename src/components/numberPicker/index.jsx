import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row } from 'antd';
import { useState } from 'react';

export default function NumberPicker() {
    const [quantityValue, setQuantityValue] = useState(0);
    const handleIncrease = () => {
        setQuantityValue((prev) => {
            console.log(prev + 1);
            return prev + 1;
        })
    }
  return (
      <Row>
            <Col span="3" >
                <PlusCircleOutlined 
                    style={{ margin: '8px' }}
                    className="cursor-pointer"
                    onClick={handleIncrease}
                />
            </Col>
            <Col span="18" >
                <Form.Item name="quantity" initialValue={0} value={quantityValue}>
                    <Input width={12} value />
                </Form.Item>
            </Col>
            <Col span="3">
                <MinusCircleOutlined
                    style={{ margin: '8px' }}
                    className="cursor-pointer"
                    onClick={() => {}}
                />
            </Col>
        </Row>
  )
}
