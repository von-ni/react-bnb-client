import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Alert } from 'antd';

export default function Login(prop) {
  const navigate = useNavigate();

  const [result, setResult] = useState({
    isVisible: false,
    message: '',
    type: '',
  });

  const onFinish = async values => {
    const { email, password } = values;
    const newLogin = { email, password };
    try {
      const response = await fetch('http://localhost:5000/api/auth/member', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(newLogin),
      });
      const res = await response.json();
      if (response.ok) {
        localStorage.setItem('token', res.token);
        prop.setLogin(true);
        navigate('/');
      } else if (response.status === 400) {
        setResult({
          isVisible: true,
          message: res.errors[0].msg,
          type: 'warning',
        });
        setTimeout(() => {
          setResult({ isVisible: false });
        }, 3000);
      }
      //console.log(res);
    } catch (err) {
      console.log(err);
      setResult({
        isVisible: true,
        message:
          'Sorry, we are not available to serve you right now. Please come back to us later.',
        type: 'error',
      });
      setTimeout(() => {
        setResult({ isVisible: false });
      }, 5000);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div>
        <h1>Login</h1>
      </div>
      {result.isVisible && (
        <Alert message={result.message} type={result.type} showIcon />
      )}
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
