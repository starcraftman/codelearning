import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json(null, { status: 500, statusText: "Could not fetch events" });
  } else {
    const data = await response.json();
    return data.events;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};

function EventsPage() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}> 
      <Await resolve={data.events}>
        {(loadedEvents) => {
          console.log('loaded', loadedEvents);
          return <EventsList events={loadedEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;
