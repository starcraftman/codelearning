import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state: navState } = useNavigation();
  const params = useParams();
  const submit = useSubmit();

  const query = useQuery({
    queryKey: ["event-details", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000
  });

  // const mutationQueryKey = ["event-details", params.id];
  // const mQuery = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     await queryClient.cancelQueries({queryKey: mutationQueryKey})
  //     const previousEvent = queryClient.getQueryData(mutationQueryKey);
  //     queryClient.setQueryData(mutationQueryKey, data.event)
  //     return { previousEvent }
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(mutationQueryKey, context.previousEvent)
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(mutationQueryKey);
  //   }
  // })
  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }
  function handleClose() {
    navigate("../");
  }

  let content;
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
        {navState === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["event-details", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  queryClient.invalidateQueries(["event-details", params.id]);
  return redirect("../");
}
