import { Button, Col, DatePicker, Form, Image, InputNumber, Row, TimePicker } from 'antd';
import { DATE_FORMAT } from 'constant';
import dayjs from 'dayjs';
import { useState } from 'react';
import './App.css';

function App() {
  const [datePicked, setDatePicked] = useState();
  const handlePickDate = (data) => {
    const parseDate =  dayjs(data).format(DATE_FORMAT);
    setDatePicked(parseDate);
    console.log(parseDate);
  }
  return (
    <Row  className="container">
      <Col span="12">
        <Image src="https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg" />
      </Col>
      <Col span="12" className='content' >
        <span>DingDoong</span>
        <div className='title'>Bakery</div>
        <Form layout='vertical' onFinish={(value) => console.log(value)}>
          <Form.Item name="price" initialValue={12}>
            <div>12 $</div> 
          </Form.Item>
          <Form.Item name="quantity" initialValue={0}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="date">
            <div>Select a delivery date</div>
            <DatePicker onChange={handlePickDate}/>
          </Form.Item>
          {
            !!datePicked && (
              <Form.Item>
                <TimePicker  />
              </Form.Item>
            )
          }
          <Button type='primary' htmlType='submit'>Add to cart</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default App;
