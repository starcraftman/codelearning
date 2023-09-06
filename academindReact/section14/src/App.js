import UserFinder from "./components/UserFinder";
import UsersContext from "./store/users-context";
import DUMMY_USERS from "./components/UserFinder"

const usersContext = {
  users: DUMMY_USERS
}

function App() {
  return (
    <div>
      <UsersContext.Provider value={usersContext}>
        <UserFinder />
      </UsersContext.Provider>
    </div>
  );
}

export default App;
