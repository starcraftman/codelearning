import { Component } from "react";
import classes from './User.module.css';

class User extends Component {
  render(props) {
    return <li className={classes.user}>{this.props.name}</li>;
  }

  componentWillUnmount() {
    console.log(`${this.props.name} will unmount`)
  }
};

// const User = (props) => {
  // return <li className={classes.user}>{props.name}</li>;
// };

export default User;
