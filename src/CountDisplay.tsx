import React from 'react';

interface Props {
  onClick: () => void;
}

const CountDisplay = function (pops: Props) {
  console.log('CountDisplay render');
  return <button onClick={pops.onClick}>Click me</button>;
};

export default React.memo(CountDisplay);
