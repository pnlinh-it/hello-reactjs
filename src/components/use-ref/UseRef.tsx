import React, { useEffect, useRef, useState } from 'react';

export default function UseRef() {
  const [count, setCount] = useState(1);
  const domRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(0);

  const updateValueRef = () => {
    valueRef.current++;
  };

  useEffect(() => {
    const divElement = domRef.current;
    console.log(divElement);
  }, []);

  function updateInputValue() {
    // domRef.current?.value = 'Hello';
    // if (domRef.current != null) {
    //   domRef.current.value = '';
    // }
    (domRef.current as HTMLInputElement).value = 'Hello';
  }

  const handleDomNodeChange = (domNode: HTMLInputElement | null) => {
    console.log(`Dom ref change: ${domNode}`);
  };

  function reRender() {
    setCount(count + 1);
    console.log(valueRef);
  }

  return (
    <div>
      <h3>Use ref</h3>
      <input name="email" ref={domRef} />
      <input name="name" ref={handleDomNodeChange} />
      <br />
      <input type="button" value="Update input value" onClick={updateInputValue} />
      <br />
      <input type="button" value="Change ref value" onClick={updateValueRef} />
      <br />
      <input type="button" value="Re-render" onClick={reRender} />
    </div>
  );
}
