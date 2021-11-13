import React from 'react';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import './AppHeader.less';
import FillSpace from '../FillSpace';

interface Props {
  isCollapsed: boolean;

  toggleCollapse: () => void;
}

function handleSignOut() {
  console.log('logout');
}

const menuHeaderDropdown = (
  <Menu>
    <Menu.Item key="/" icon={<UserOutlined />}>
      Profile
    </Menu.Item>

    <Menu.Item onClick={handleSignOut} icon={<LogoutOutlined />} key="/logout">
      Sign Out
    </Menu.Item>
  </Menu>
);

export default function AppHeader(props: Props) {
  const makeToggleButton = () => {
    return React.createElement(props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'toggle-button',
      onClick: props.toggleCollapse,
    });
  };

  return (
    <Layout.Header className={'app-header'}>
      {makeToggleButton()}
      <FillSpace />
      <Button className={'new-button'} icon={<PlusCircleOutlined />} shape="round" type="primary">
        New
      </Button>
      <Dropdown overlay={menuHeaderDropdown} placement="bottomRight">
        <span className={'profile'}>
          <Avatar size="small" src="https://pnlinh.me/img/me.jpg" />
          <span className={'name'}>Linh Pham</span>
        </span>
      </Dropdown>
    </Layout.Header>
  );
}
