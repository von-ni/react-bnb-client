import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Alert, DatePicker, Select } from "antd";
import PriceSelector from "../components/PriceSelector";
import { roomType } from "../data-room";
import { SERVER_URL } from "../config";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Book() {
  const navigate = useNavigate();
  const [fName, setFName] = useState();
  const [room, setRoom] = useState();
  const [form] = Form.useForm();
  const [result, setResult] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const profileLoading = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/members/member`, {
          method: "GET",
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        const res = await response.json();
        //console.log(res);
        if (response.ok) {
          const {
            name: { firstName },
          } = res;
          return setFName(firstName);
        } else {
          setResult({
            isVisible: true,
            message: res.errors[0].msg,
            type: "warning",
          });
          setTimeout(navigate("/Login"), 2000);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        setResult({
          isVisible: true,
          message: "Error. Please try agian later",
          type: "error",
        });
        setTimeout(() => {
          setResult({ isVisible: false });
        }, 5000);
      }
    };
    profileLoading();
  });

  const onFinish = async (values) => {
    setResult({ isVisible: false });
    console.log(values.data.datesDetail);
    if (values.data.datesDetail.length === 0) {
      return setResult({
        isVisible: true,
        message: "Please select reservation dates",
        type: "warning",
      });
    }
    const newBooking = { ...values, ...values.data };
    newBooking.expirationDate = newBooking.expirationDate.format("MM/YY");
    console.log(newBooking);
    try {
      const response = await fetch(`${SERVER_URL}/bookings/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newBooking),
      });
      const res = await response.json();
      if (response.ok) {
        setResult({
          isVisible: true,
          message: "We received your booking!",
          type: "success",
        });
        localStorage.setItem("token", res.token);
      } else if (response.status === 400) {
        setResult({
          isVisible: true,
          message: res.errors[0].msg,
          type: "warning",
        });
      }
    } catch (err) {
      console.log(err);
      setResult({
        isVisible: true,
        message: "Error. Please try agian later",
        type: "error",
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>{`Hello ${fName}`}</h1>
        <h6>there is one more step to your vacation!</h6>
      </div>
      {result.isVisible && (
        <Alert message={result.message} type={result.type} showIcon />
      )}
      <div>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="roomType"
            label="Room Type"
            rules={[
              {
                required: true,
                message: "Please select room Type",
              },
            ]}
          >
            <Select
              placeholder="select room type first"
              onChange={(v) => setRoom(v)}
            >
              {roomType.map((r, i) => (
                <Option value={r.name} key={i}>
                  {r.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="data"
            label="Reservation Details"
            rules={[
              {
                required: true,
                message: "Please select.",
              },
            ]}
          >
            <PriceSelector room={room} isBtn={false} form={form} />
          </Form.Item>
          <Form.Item
            name="cardNo"
            label="Credit Card No."
            rules={[
              {
                required: true,
                message: "Please use Mastercad or Visa.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cardholder"
            label="Cardholder"
            rules={[
              {
                required: true,
                message: "Please input cardholder name.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="expirationDate"
            label="Expiration Date"
            rules={[
              {
                required: true,
                message: "Please select.",
              },
            ]}
          >
            <DatePicker picker="month" />
          </Form.Item>

          <Form.Item
            name="cvc"
            label="CVC"
            rules={[
              {
                required: true,
                message: "Please input your CVC.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name></Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Make the reservation
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
