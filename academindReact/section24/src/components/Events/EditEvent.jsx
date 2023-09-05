import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const mutationQueryKey = ["event-details", params.id];

  const query = useQuery({
    queryKey: ["event-details", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
  const mQuery = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      await queryClient.cancelQueries({queryKey: mutationQueryKey})
      const previousEvent = queryClient.getQueryData(mutationQueryKey);
      queryClient.setQueryData(mutationQueryKey, data.event)
      return { previousEvent }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(mutationQueryKey, context.previousEvent)
    }, 
    onSettled: () => {
      queryClient.invalidateQueries(mutationQueryKey);
    }
  })
  function handleSubmit(formData) {
    mQuery.mutate({ id: params.id, event: formData });
    navigate("../");
  }
  function handleClose() {
    navigate("../");
  }

  let content;
  if (query.isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }
  if (query.isError) {
    content = (
      <>
        <ErrorBlock
          title="An error occurred"
          message={query.error.info?.message || "Failed to fetch events"}
        />
        <div className="formActions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }
  if (query.data) {
    content = (
      <EventForm inputData={query.data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
