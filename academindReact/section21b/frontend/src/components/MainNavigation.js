import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";

function MainNavigation() {
  function isActiveHandler({ isActive }) {
    return isActive ? styles.active : "";
  }
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink className={isActiveHandler} to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveHandler} to="/events">
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
