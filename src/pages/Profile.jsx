import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Alert } from "antd";
import { SERVER_URL } from "../config";

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

export default function Profile(prop) {
  const navigate = useNavigate();

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
            name: { firstName, lastName },
            email,
          } = res;
          return form.setFieldsValue({
            firstName,
            lastName,
            email,
          });
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
    // console.log(values);
    const { firstName, lastName, email, password, oldPassword } = values;

    const updateMember = {
      name: { firstName, lastName },
      email,
      password,
      oldPassword,
    };
    try {
      const response = await fetch(`${SERVER_URL}/members/member`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updateMember),
      });
      const res = await response.json();
      if (response.ok) {
        setResult({
          isVisible: true,
          message: "Update Success",
          type: "success",
        });
        localStorage.setItem("token", res.token);
        prop.setLogin(true);
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
      setTimeout(() => {
        setResult({ isVisible: false });
      }, 5000);
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
        <h1>Profile</h1>
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
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name.",
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
                message: "Please input your first name.",
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
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                message:
                  "Password has to be 8 or more characters with at least one uppercase, lowercase and number.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                message:
                  "Password has to be 8 or more characters with at least one uppercase, lowercase and number.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
