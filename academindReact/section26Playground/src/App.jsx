import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const boxAnimate = {x, y, rotate};
  const boxTransition = {
    duration: 0.5,
    type: 'spring'
  };

  return (
    <div id="demo">
      {/* <div id="box" /> */}
      <motion.div animate={boxAnimate} transition={boxTransition} id="box" />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
