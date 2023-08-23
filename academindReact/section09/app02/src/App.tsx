import React from 'react';
import './App.css';

import AddUser from './components/Users/AddUser';
import UserList, { UserType } from './components/Users/UserList';

let idNum = 1;

function App() {
  const [addedUsers, setAddedUsers] = React.useState([] as UserType[]);
  const newUserHandler = (name: string, age: number) => {
      const newUser: UserType = {
        name: name,
        age: age,
        key: idNum
      }
      idNum += 1;
      setAddedUsers((prevState) => {
        return [
          ...prevState,
          newUser
        ]
      })
  }
  return (
    <div>
      <AddUser onAdd={newUserHandler}/>
      <UserList users={addedUsers}/>
    </div>
  );
}

export default App;
