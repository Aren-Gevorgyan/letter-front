import React, { FC } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./styles.module.scss";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Registration: FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        className={styles.email}
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        className={styles.password}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 0 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0 }}>
        <Button type="primary" htmlType="submit">
          Registration
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
