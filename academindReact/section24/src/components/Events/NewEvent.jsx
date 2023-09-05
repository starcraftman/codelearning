import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock";

export default function NewEvent() {
  const navigate = useNavigate();
  const query = useMutation({
    mutationFn: createNewEvent,
  });

  function handleSubmit(formData) {
    query.mutate({ event: formData });
  }

  const formContent = (
    <>
      <Link to="../" className="button-text">
        Cancel
      </Link>
      <button type="submit" className="button">
        Create
      </button>
    </>
  );

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {query.isPending && "Submitting ..."}
        {!query.isPending && formContent}
      </EventForm>
      {query.isError && <ErrorBlock title="Failed to create event" message={query.error.info?.message || "Failed to create event. Please check and try again later."} />}
    </Modal>
  );
}
