import React from 'react';

import './App.css';
import Button from "./components/UI/Button/Button";
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  const [showParagraph, setShowParagraph] = React.useState(false);
  const [allowToggle, setAllowToggle] = React.useState(false);
  const toggleParagraphHandler = React.useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevState) => {
        return !prevState;
      });
    }
  }, [allowToggle]);
  const toggleAllowHandler = () => {
    setAllowToggle(true);
  }

  console.log('APP RUNNING');

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={toggleAllowHandler}>Toggle Allow!</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
