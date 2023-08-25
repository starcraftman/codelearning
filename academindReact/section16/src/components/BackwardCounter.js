import Card from './Card';
import useCounter from "../hooks/use-counter.js";

const counterFunc = (num) => num - 1;

const BackwardCounter = () => {
  const counter = useCounter(counterFunc);
  return <Card>{counter}</Card>;
};

export default BackwardCounter;
