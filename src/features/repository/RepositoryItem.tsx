import React from 'react';
import { List, Skeleton, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';
import { RepositorySate } from './repositorySlice';
import { CalendarOutlined, GithubFilled } from '@ant-design/icons';
import './RepositoryItem.less';

export interface Props {
  item: RepositorySate;
}
export default function RepositoryItem(props: Props) {
  return (
    <List.Item key={props.item.id}>
      <List.Item.Meta
        title={
          <Link className={'repository-title'} to={`/repositories/${props.item.id}`}>
            {props.item.app_name}
          </Link>
        }
        avatar={
          <Img
            width={100}
            loader={<Skeleton.Avatar size={100} shape="square" active />}
            src={props.item.icon}
            alt="Title Image"
          />
        }
        description={
          <Space direction="vertical" size="middle">
            <span>
              <GithubFilled />
              <a
                className={'github-url'}
                href={props.item.url}
              >{`${props.item.owner}/${props.item.name}`}</a>
            </span>
            <span>
              <CalendarOutlined /> {` ${props.item.created_at}`}
            </span>
          </Space>
        }
      />
    </List.Item>
  );
}
