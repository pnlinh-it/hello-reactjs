import React from 'react';

interface Props {
  content: string;
  onClick: () => void;
}

function Button(props: Props) {
  console.log('Button re-render');
  return <button onClick={props.onClick}>{props.content}a</button>;
}
export default React.memo(Button);
