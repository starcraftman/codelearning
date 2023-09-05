import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { fetchEvent, deleteEvent } from "../../util/http.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";

import Header from "../Header.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["event-details", params.id],
    queryFn: ({ signal }) => {
      console.log("here");
      return fetchEvent({ id: params.id, signal });
    },
  });

  const mQuery = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["events"], refetchType: "none"})
      navigate("/events");
    },
  });

  const deleteHandler = () => {
    mQuery.mutate({ id: params.id });
  };

  let content;
  if (query.isPending) {
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
      </div>
    );
  }
  if (query.isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="An error occurred"
          message={query.error.info?.message || "Failed to fetch events"}
        />
      </div>
    );
  }
  if (query.data) {
    console.log(query.data);
    const formattedDate = new Date(query.data.date).toLocaleDateString("en-CA", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    content = (
      <article id="event-details">
        <header>
          <h1>{query.data.title}</h1>
          <nav>
            <button onClick={deleteHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img
            src={`http://localhost:3000/${query.data.image}`}
            alt={query.data.title}
          />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{query.data.address}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {query.data.time}
              </time>
            </div>
            <p id="event-details-description">{query.data.description}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}
