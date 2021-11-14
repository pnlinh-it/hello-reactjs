import React, { FunctionComponent, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { AliwangwangFilled, AppstoreFilled, HomeFilled } from '@ant-design/icons';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  path: string;
  label: string;
  iconComponent: FunctionComponent;
}

const defaultItem: MenuItem = {
  key: '1',
  label: 'Repositories',
  path: '/',
  iconComponent: HomeFilled,
};
const items: MenuItem[] = [
  defaultItem,
  {
    key: '2',
    label: 'Profile',
    path: '/profile',
    iconComponent: AliwangwangFilled,
  },
  {
    key: '3',
    label: 'Service Contract Details',
    path: '/admin/service-contract-details',
    iconComponent: AppstoreFilled,
  },
];

interface Props {
  collapse?: boolean;
}

export default function AppSidebar(prop: Props) {
  const location = useLocation();
  const history = useHistory();

  const currentKey = useMemo(() => {
    const path = location.pathname;
    if (path === defaultItem.path) {
      return defaultItem.key;
    }
    return (
      items.find((item) => item.path !== '/' && path.startsWith(item.path))?.key || defaultItem.key
    );
  }, [location.pathname]);

  const onClickMenu = (item: { key: string }) => {
    const clicked = items.find((_item) => _item.key === item.key);
    if (clicked) {
      history.push(clicked.path);
    }
  };

  return (
    <Sider collapsed={prop.collapse}>
      <h3
        style={{
          paddingLeft: '1rem',
          paddingTop: '1rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          minHeight: 64,
          margin: 0,
        }}
      >
        AppHouse
      </h3>
      <Menu selectedKeys={[currentKey]} mode="inline" theme="dark">
        {items.map((item) => (
          <Menu.Item
            icon={React.createElement(item.iconComponent)}
            onClick={onClickMenu}
            key={item.key}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
