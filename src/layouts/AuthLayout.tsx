import React from 'react';
import { Layout, Typography } from 'antd';
import logo from '../logo.svg';
import './AuthLayout.less';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout(props: Props) {
  return (
    <div className={'container'}>
      <div className={'content'}>
        <div className={'top'}>
          <div className={'header'}>
            <a href="/">
              <a>
                <img className={'logo'} src={logo} alt="App Logo" />
                <span className={'title'}>Feednext</span>
              </a>
            </a>
          </div>
          <div className={'desc'} />
        </div>
        {props.children}
      </div>
      <Layout.Footer style={{ background: 'transparent', textAlign: 'center' }}>
        <Typography.Text>Feednext © 2020. All rights reserved</Typography.Text>
      </Layout.Footer>
    </div>
  );
}
