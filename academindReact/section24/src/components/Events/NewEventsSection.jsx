import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

export default function NewEventsSection() {
  const query = useQuery({
    queryKey: ["events", {max: 3}],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1]}),
    staleTime: 5000, // Time before new fetch after getting attention
  });
  let content;

  if (query.isPending) {
    content = <LoadingIndicator />;
  }

  if (query.isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={query.error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (query.data) {
    content = (
      <ul className="events-list">
        {query.data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
