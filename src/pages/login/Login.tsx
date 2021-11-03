import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Tabs } from 'antd';
import AuthLayout from '../../layouts/AuthLayout';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.less';

export declare interface FormDataType {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [form] = Form.useForm();

  const [isSigning, setIsSigning] = useState(false);

  const onSubmit = (values: FormDataType): void => {
    const isEmail = /\S+@\S+\.\S+/.test(values.usernameOrEmail);
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
    }, 3000);

    // signIn({
    //   ...(isEmail ? { email: values.usernameOrEmail } : { username: values.usernameOrEmail }),
    //   rememberMe: values.remember ? true : false,
    //   password: values.password,
    // })
    //   .then(async (res) => {
    //     await dispatch({
    //       type: SET_ACCESS_TOKEN,
    //       token: res.data.attributes.access_token,
    //     });
    //     delete res.data.attributes.access_token;
    //
    //     await dispatch({
    //       type: SIGN_IN,
    //       user: res.data,
    //     });
    //
    //     router.push('/');
    //   })
    //   .catch((error) => {
    //     setIsSigning(false);
    //     message.error(error.response.data.message, 5);
    //   });
  };

  return (
    <AuthLayout>
      <div className={'main'}>
        <Form form={form} name="sign-in" onFinish={onSubmit} size="middle" scrollToFirstError>
          <Tabs>
            <Tabs.TabPane key="sign-in" tab="Sign In">
              <Form.Item
                name="usernameOrEmail"
                rules={[{ required: true, message: 'Please input your username or email!' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#717171' }} />}
                  placeholder="Username or Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#717171' }} />}
                  placeholder="Password"
                />
              </Form.Item>

              <Row>
                <Col span={12}>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item style={{ float: 'right' }}>
                    <a href="/auth/sign-in/forgot-password">
                      <a style={{ color: '#d60d17' }}>Forgot Password</a>
                    </a>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  loading={isSigning}
                  className={'submit'}
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Sign In
                </Button>
                <a href="/auth/sign-up">
                  <a className={'register'}>Create an Account</a>
                </a>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </div>
    </AuthLayout>
  );
}
