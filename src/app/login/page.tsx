'use client'
import React from "react";
import { Form, Input, Button, message, FormProps } from "antd";
import styles from './login.module.css'; // Import the CSS file for custom styles
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { AxiosErrorResponseType } from "@/types";
import client from "@/utils/client";
import { redirect } from "next/navigation";

type LoginValues = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const onFinish: FormProps<LoginValues>['onFinish'] = async (values) => {
    console.log("Success:", values);
    try {
      await client.post("/login", values);
      message.success("Login successful!");
      redirect("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorResponse = axiosError.response
        ?.data as AxiosErrorResponseType;

      message.error(axiosErrorResponse.message ?? axiosError.message);
    }
  };

  const onFinishFailed: FormProps<LoginValues>['onFinishFailed'] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.loginContainer}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <div style={{
          padding: '2rem',
          borderRadius: '8px 0 0 8px',
          backgroundColor: 'white',
        }}>
          <h1 className="text-3xl mb-6">Login</h1>
          <Form
            style={{ width: 300 }}
            variant="filled"
            size="large"
            layout="vertical"
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                block
                htmlType="submit"
                style={{ backgroundColor: '#0C74B6', color: 'white', border: 'none' }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{
          textAlign: 'center',
          width: 300,
          background: '#0C74B6',
          color: 'white',
          padding: '1rem',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          borderRadius: '0 8px 8px 0',
        }}>
          <div>
            <div className="font-bold text-xl mb-0">SISTEM PATROLI</div>
            <div>PT. UNGARAN SARI GARMENTS</div>
          </div>
          <small>© {new Date().getFullYear()}</small>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;