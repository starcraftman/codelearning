import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(null, {'status': 500, statusText: "Could not fetch events"})
  } else {
    return response;
  }
};

function EventsPage() {
  const data = useLoaderData();

  return <EventsList events={data.events}/>;
}

export default EventsPage;
