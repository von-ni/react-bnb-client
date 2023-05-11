import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Alert, Modal } from 'antd';

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

export default function Register(prop) {
  const navigate = useNavigate();
  const [result, setResult] = useState({
    isVisible: false,
    message: '',
    type: '',
  });
  const [form] = Form.useForm();

  const onFinish = async values => {
    const { firstName, lastName, email, password } = values;
    const newMember = {
      name: { firstName, lastName },
      email,
      password,
    };
    try {
      const response = await fetch('http://localhost:5000/api/members/member', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(newMember),
      });
      const res = await response.json();
      if (response.ok) {
        setResult({
          isVisible: true,
          message: 'Register Success',
          type: 'success',
        });
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
          navigate('/login');
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

  const showAgreement = () => {
    Modal.info({
      title: 'Ageement',
      content: (
        <div>
          <p>Etiam semper ligula lorem, vel suscipit tortor vehicula non.</p>
          <p>
            SQuisque laoreet, lorem id vehicula vestibulum, justo nunc mollis
            ligula, at aliquet neque nisi vehicula augue. Pellentesque non elit
            metus. Etiam vitae erat eu sapien tincidunt venenatis.
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div>
        <h1>Register</h1>
      </div>
      {result.isVisible && (
        <Alert message={result.message} type={result.type} showIcon />
      )}
      <div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please input your first name.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your first name.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                message:
                  'Password has to be 8 or more characters with at least one uppercase, lowercase and number.',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the{' '}
              <span
                style={{
                  textDecoration: 'underline',
                  color: '#0804f9',
                  textDecorationColor: '#0804f9',
                }}
                onClick={showAgreement}
              >
                agreement
              </span>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
