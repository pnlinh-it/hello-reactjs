import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRepositories, RepositorySate } from './repositorySlice';
import { List, message } from 'antd';
import { ApiStatus } from '../../common/api/ApiStatus';
import RepositoryItem from './RepositoryItem';

export default function RepositoryList() {
  const dispatch = useAppDispatch();
  const repositoriesSate = useAppSelector((state) => state.repositories);

  useEffect(() => {
    if (repositoriesSate.error) {
      message.destroy();
      message.error(repositoriesSate.error);
    }
  }, [repositoriesSate.error]);

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch]);

  return (
    <List<RepositorySate>
      style={{ marginTop: 25 }}
      rowKey="id"
      size="large"
      itemLayout="vertical"
      loading={{
        spinning: repositoriesSate.status === ApiStatus.LOADING,
      }}
      dataSource={repositoriesSate.items}
      renderItem={(item): JSX.Element => <RepositoryItem item={item} />}
    />
  );
}
