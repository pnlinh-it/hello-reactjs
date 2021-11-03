import React from 'react';

interface Props {
  content: string;
  onClick: () => void;
}

function MyButton(props: Props) {
  console.log('Button re-render');
  return <button onClick={props.onClick}>{props.content}a</button>;
}
export default React.memo(MyButton);
