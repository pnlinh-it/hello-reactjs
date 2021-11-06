import React, { useEffect } from 'react';
import { Button, Col, Divider, Form, Input, message, Row, Tabs } from 'antd';
import AuthLayout from '../../layouts/AuthLayout';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.less';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { ApiStatus } from '../../common/api/ApiStatus';
import { googleRedirectUrl } from '../../features/auth/googleAuthSlice';

export declare interface FormData {
  email: string;
  password: string;
}

const rules = {
  email: [{ required: true, message: 'Please input your username or email!' }],
  password: [{ required: true, message: 'Please input your password!' }],
};

export default function Login() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const authState = useAppSelector((state) => state.auth);
  const googleState = useAppSelector((state) => state.googleAuth);

  useEffect(() => {
    if (authState.error) {
      message.destroy();
      message.error(authState.error);
    }
  }, [authState.error]);

  useEffect(() => {
    if (googleState.error) {
      message.destroy();
      message.error(googleState.error);
    }
  }, [googleState.error]);

  useEffect(() => {
    if (authState.isLogin) {
      history.replace('/');
    }
  }, [authState.isLogin, history]);

  const onSubmit = (values: FormData): void => {
    dispatch(login(values));
  };

  async function onGetGoogleRedirect() {
    const resultAction = await dispatch(googleRedirectUrl());
    if (googleRedirectUrl.fulfilled.match(resultAction)) {
      const { url } = resultAction.payload;
      window.location.href = url;
    }
  }

  return (
    <AuthLayout>
      <div className={'main'}>
        <Form form={form} name="sign-in" onFinish={onSubmit} size="middle" scrollToFirstError>
          <Tabs>
            <Tabs.TabPane key="sign-in" tab="Sign In">
              <Form.Item name="email" rules={rules.email}>
                <Input
                  prefix={<UserOutlined className={'input-prefix-icon'} />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item name="password" rules={rules.password}>
                <Input.Password
                  prefix={<LockOutlined className={'input-prefix-icon'} />}
                  placeholder="Password"
                />
              </Form.Item>

              <Row justify="space-between">
                <Col span={12}>
                  <Form.Item>
                    <Button
                      loading={authState.status === 'loading'}
                      block
                      type="primary"
                      htmlType="submit"
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link to="/auth/password/forget"> Forget password</Link>
                  </Form.Item>
                </Col>
              </Row>

              <Divider>Or connect with</Divider>

              <div style={{ textAlign: 'center' }}>
                <Button
                  loading={googleState.status === ApiStatus.LOADING}
                  onClick={onGetGoogleRedirect}
                  shape="circle"
                  icon={<GoogleOutlined />}
                  size="large"
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </div>
    </AuthLayout>
  );
}
