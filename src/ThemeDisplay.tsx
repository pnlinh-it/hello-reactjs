import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeDisplay = (props: { onClick: () => void }) => {
  console.log('theme display render');
  const { theme } = useContext(ThemeContext);

  return <label onClick={props.onClick}>Current theme: {theme}</label>;
};

export default React.memo(ThemeDisplay);
