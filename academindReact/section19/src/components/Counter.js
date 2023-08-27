import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const toggleCounterHandler = () => {
    dispatch({
      type: 'toggle',
    })
  };
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);
  const incHandler = () => {
    dispatch({
      type: 'inc'
    })
  }
  const incFiveHandler = () => {
    dispatch({
      type: 'inc',
      amt: 5
    })
  }
  const decHandler = () => {
    dispatch({
      type: 'dec'
    })
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incHandler}>Inc</button>
        <button onClick={incFiveHandler}>Increment By 5</button>
        <button onClick={decHandler}>Dec</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// import { Component } from 'react';
// import { connect } from "react-redux";
// class Counter2 extends Component {
//   incHandler() {
//     this.props.increment();
//   }
//   decHandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {

//   }

//   render() {
//     return <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{this.props.counter}</div>
//       <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       <div>
//         <button onClick={this.incHandler}>Inc</button>
//         <button onClick={this.decHandler}>Dec</button>
//       </div>
//     </main>
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({type: 'inc'}),
//     decrement: () => dispatch({type: 'dec'})
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Counter2);

export default Counter;
