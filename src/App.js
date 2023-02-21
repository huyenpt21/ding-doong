import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Row,
  TimePicker,
} from "antd";
import { DATE_FORMAT } from "constant";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import "./App.css";
// import locale from "antd/es/locale/en/ES";

function App() {
  // config antd
  var updateLocale = require("dayjs/plugin/updateLocale");
  var isoWeek = require("dayjs/plugin/isoWeek");
  dayjs.extend(isoWeek);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });
  const { RangePicker } = DatePicker;

  const [datePicked, setDatePicked] = useState();
  const [timePicked, setTimePicked] = useState();
  const defaultPrice = useRef(12);
  const [price, setPrice] = useState(defaultPrice.current);
  const handlePickDate = (dates) => {
    dates?.forEach((date, index) => {
      if (!date) {
        dates.splice(index, 1);
      }
    });
    setDatePicked(dates);
  };
  const handleChangeQuantity = (quantity) => {
    setPrice(defaultPrice.current * quantity);
  };

  const disableDatePicker = (date) => {
    //disable unable pick date
    const currentTime = dayjs().get("hour");
    const weekend = dayjs(date).day() === 0 || dayjs(date).day() === 6;
    //enable 2 days next
    const onlyAllow2DaysNext = date < dayjs().add(2, "day");
    const onlyAllow3DaysNext = date < dayjs().add(3, "day");
    //disable range date
    if (datePicked?.length) {
      const startDate = datePicked[0];
      const endDate = datePicked[1];
      const onlyAllow5DaysNext = date > dayjs(startDate).add(5, "days");
      const onlyAllow5DaysPrev = date < dayjs(endDate).subtract(5, "days");

      if (currentTime < 12) {
        return (
          weekend ||
          onlyAllow2DaysNext ||
          onlyAllow5DaysNext ||
          onlyAllow5DaysPrev
        );
      }
      return (
        weekend ||
        onlyAllow3DaysNext ||
        onlyAllow5DaysNext ||
        onlyAllow5DaysPrev
      );
    }

    if (currentTime < 12) {
      return weekend || onlyAllow2DaysNext;
    }
    return weekend || onlyAllow3DaysNext;
  };

  const disableTime = (_, type) => {
    const startDayOfWeekPicked = dayjs(datePicked[0]).day();
    const endDayOfWeekPicked = dayjs(datePicked[1]).day();
    if (startDayOfWeekPicked === 1 && endDayOfWeekPicked <= 3) {
      if (type === "start") {
        return {
          disabledHours: () => [...getRange(0, 9), ...getRange(13, 24)],
        };
      }
      if (type === "end" && timePicked) {
        const hourPicked = dayjs(timePicked[0]).hour();
        if (hourPicked === 10) {
          return {
            disabledHours: () => [
              ...getRange(0, hourPicked - 1),
              ...getRange(12, 24),
            ],
          };
        }
        if (hourPicked > 10) {
          return {
            disabledHours: () => [
              ...getRange(0, hourPicked - 1),
              ...getRange(13, 24),
            ],
          };
        }
      }
    }
    if (startDayOfWeekPicked === 4 && endDayOfWeekPicked === 5) {
      if (type === "start") {
        return {
          disabledHours: () => [...getRange(0, 13), ...getRange(17, 24)],
        };
      }
      if (type === "end" && timePicked) {
        const hourPicked = dayjs(timePicked[0]).hour();
        if (hourPicked === 14) {
          return {
            disabledHours: () => [
              ...getRange(0, hourPicked - 1),
              ...getRange(16, 24),
            ],
          };
        }
        if (hourPicked > 14) {
          return {
            disabledHours: () => [
              ...getRange(0, hourPicked - 1),
              ...getRange(17, 24),
            ],
          };
        }
      }
    }
    return [];
  };

  const getRange = (start, end) => {
    const arrRange = [];
    for (let index = start; index <= end; index++) {
      arrRange.push(index);
    }
    return arrRange;
  };
  const handleChangeTimePicker = (time) => {
    setTimePicked(time);
  };
  return (
    <Row className="container">
      <Col span="12">
        <Image src="https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg" />
      </Col>
      <Col span="12" className="content">
        <span>DingDoong</span>
        <div className="title">Bakery</div>
        <Form layout="vertical">
          <Form.Item name="price" initialValue={12}>
            <div>{price} $</div>
          </Form.Item>
          <Form.Item name="quantity" initialValue={0} label="Quantity">
            <InputNumber min={0} onChange={handleChangeQuantity} />
          </Form.Item>
          <ConfigProvider>
            <Form.Item name="date" label="Select a delivery date">
              <RangePicker
                disabledDate={disableDatePicker}
                ble
                onCalendarChange={handlePickDate}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </ConfigProvider>
          {datePicked?.length >= 2 && (
            <Form.Item>
              <TimePicker.RangePicker
                disabledTime={disableTime}
                hideDisabledOptions
                format="HH:mm"
                onCalendarChange={handleChangeTimePicker}
                showNow={false}
              />
            </Form.Item>
          )}
          <Button
            disabled={!timePicked || !datePicked}
            type="primary"
            htmlType="submit"
          >
            Add to cart
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default App;
