import React from "react";
import EventsList from "../components/EventsList";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event 1", image: null, date: "10:00" },
  { id: "e2", title: "Event 2", image: null, date: "12:00" },
  { id: "e3", title: "Event 3", image: null, date: "15:00" },
  { id: "e4", title: "Event 4", image: null, date: "17:00" },
];
function EventsPage() {
  return <EventsList events={DUMMY_EVENTS} />;
}

export default EventsPage;
