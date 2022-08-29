import { useEffect, useRef, useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   MainuseInterval(() => {
//     setCount(count + 1);
//   }, 1000);

//   return <h1>{count}</h1>;
// }

const MainuseInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default MainuseInterval;
