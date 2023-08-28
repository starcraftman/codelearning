import { NavLink } from "react-router-dom";

import styles from "./EventsNavigation.module.css";

function EventsNavigation() {
  function isActiveHandler({ isActive }) {
    return isActive ? styles.active : "";
  }
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink className={isActiveHandler} to="/events" end>
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveHandler} to="/events/new" end>
              New Event
            </NavLink>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
