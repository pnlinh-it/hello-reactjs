import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginGoogleCallback, LoginGoogleRequest } from './googleAuthSlice';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, Divider, Spin } from 'antd';
import errorImage from '../../img_error.png';
import './GoogleAuth.less';
import { HomeFilled } from '@ant-design/icons';

export default function LoginGoogleCallback() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authState = useAppSelector((state) => state.auth);

  const queries = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    const loginRequest: LoginGoogleRequest = {};
    urlParams.forEach((value, key) => (loginRequest[key] = value));
    return loginRequest;
  }, [location.search]);

  useEffect(() => {
    dispatch(loginGoogleCallback(queries));
  }, [dispatch, queries]);

  return (
    <AuthLayout>
      {!!authState.error || (
        <div className={'main'} style={{ textAlign: 'center' }}>
          <Spin style={{ marginTop: '20px' }} size="large" tip="Singing..." />
        </div>
      )}
      {!!authState.error && (
        <div className={'error-container'} style={{ textAlign: 'center' }}>
          <img src={errorImage} alt="Error" />
          <h1>Oops...</h1>
          <h3>{authState.error}</h3>
          <Divider />
          <Button icon={<HomeFilled />} type="primary" shape="round" href="/">
            Go to Homepage
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
