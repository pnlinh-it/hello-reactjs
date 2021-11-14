import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Divider, List, message, PageHeader, Row } from 'antd';
import { AndroidOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BranchState, fetchRepository } from './repositoryDetailSlice';
import { isLoading } from '../../common/api/ApiStatus';
import PageLoading from '../../components/PageLoading';
import BranchItem from './BranchItem';

interface Params {
  repositoryId: string;
}

export default function RepositoryDetail() {
  const { repositoryId } = useParams<Params>();

  const dispatch = useAppDispatch();
  const repositorySate = useAppSelector((state) => state.repositoryDetail);
  const repository = useAppSelector((state) => state.repositoryDetail.item);

  useEffect(() => {
    if (repositorySate.error) {
      message.destroy();
      message.error(repositorySate.error);
    }
  }, [repositorySate.error]);

  useEffect(() => {
    dispatch(fetchRepository(parseInt(repositoryId)));
  }, [dispatch, repositoryId]);

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/repositories">
        <BookOutlined />
        <span>Repositories</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <AndroidOutlined />
        <span>Hello danger</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  if (isLoading(repositorySate.status)) {
    return <PageLoading />;
  }

  return (
    <div>
      <PageHeader
        title={repository.app_name}
        breadcrumb={breadcrumb}
        subTitle={<span>{repository.created_at.toString()}</span>}
      >
        <Row>
          <div className="image">
            <img src={repository.icon} alt="content" width="100px" />
          </div>
        </Row>
      </PageHeader>
      <Divider />
      <h4>Branches</h4>
      <List<BranchState>
        style={{ marginTop: 25 }}
        rowKey="id"
        size="large"
        itemLayout="vertical"
        loading={{
          spinning: isLoading(repositorySate.status),
        }}
        dataSource={repository.branches}
        renderItem={(item): JSX.Element => <BranchItem branch={item} repository={repository} />}
      />
    </div>
  );
}
