import React, { useState } from 'react';
import { Layout } from 'antd';
import './AppLayout.less';
import AppSidebar from '../components/sidebar/AppSidebar';
import AppHeader from '../components/header/AppHeader';
import PrivateRoute from '../components/PrivateRoute';
import RepositoryList from '../features/apps/RepositoryList';
import { Switch } from 'react-router-dom';
import UserProfile from '../features/profile/UserProfile';

const { Content } = Layout;

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((currentState) => !currentState);

  return (
    <Layout className={'h-full'}>
      <AppSidebar collapse={isCollapsed} />
      <Layout>
        <AppHeader isCollapsed={isCollapsed} toggleCollapse={toggleSidebar} />
        <Content className={'app-content'}>
          <Switch>
            <PrivateRoute path="/profile">
              <UserProfile />
            </PrivateRoute>
            <PrivateRoute path="/">
              <RepositoryList />
            </PrivateRoute>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
