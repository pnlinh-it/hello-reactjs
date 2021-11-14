import React from 'react';
import { Spin } from 'antd';

export default function PageLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin />
    </div>
  );
}
