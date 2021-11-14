import React from 'react';
import { List, Space } from 'antd';
import {
  BranchesOutlined,
  CalendarOutlined,
  GithubFilled,
  MessageOutlined,
} from '@ant-design/icons';
import './RepositoryItem.less';
import { BranchState, RepositorySate } from './repositoryDetailSlice';

export interface Props {
  branch: BranchState;
  repository: RepositorySate;
}

export default function BranchItem(props: Props) {
  const event = props.branch.events[0];
  const repositoryOwner = props.repository.owner;
  const repositoryName = props.repository.name;
  const commitSha = event?.commit_sha;
  const commitMessage = event?.commit_message;
  const branchUrl = `https://github.com/${repositoryOwner}/${repositoryName}/tree/${props.branch.name}`;
  const commitUrl = `https://github.com/${repositoryOwner}/${repositoryName}/commit/${commitSha}`;
  const createdAt = event?.created_at?.toString();

  return (
    <List.Item key={props.branch.id}>
      <List.Item.Meta
        title={
          <a href={branchUrl}>
            <BranchesOutlined /> <span>{props.branch.name}</span>
          </a>
        }
        description={
          event && (
            <Space direction="horizontal" size="large">
              <span>
                <MessageOutlined />
                <a className={'github-url'} href={commitUrl}>
                  {commitMessage}
                </a>
              </span>

              <span>
                <GithubFilled />
                <a className={'github-url'} href={commitUrl}>
                  {commitSha?.substr(0, 7)}
                </a>
              </span>
              <span>
                <CalendarOutlined /> <span>{createdAt}</span>
              </span>
            </Space>
          )
        }
      />
    </List.Item>
  );
}
