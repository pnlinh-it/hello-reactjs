import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.less';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout(props: Props) {
  return (
    <div className={'container'}>
      <div className={'header'}>
        <Link to="/">
          <span className={'title'}>AppHouse</span>
        </Link>
      </div>
      {props.children}
    </div>
  );
}
