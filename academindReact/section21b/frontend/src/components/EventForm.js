import { useNavigate, Form, useNavigation, useActionData } from "react-router-dom";

import classes from "./EventForm.module.css";
import { action } from "../pages/NewEvent";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate("..");
  }
  let errorsLine;
  if (actionData && actionData.errors) {
    errorsLine = (
      <ul>
        {Object.values(actionData.errors).map((err) => <li key={err}>{err}</li>)}
      </ul>

    );
  }

  console.log('errors', errorsLine, actionData)

  return (
    <Form method="POST" className={classes.form}>
      {errorsLine}
      <p>
        <label htmlFor="title">Title</label>
        <input
          defaultValue={event ? event.title : ""}
          id="title"
          type="text"
          name="title"
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          defaultValue={event ? event.image : ""}
          id="image"
          type="url"
          name="image"
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          defaultValue={event ? event.date : ""}
          id="date"
          type="date"
          name="date"
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          defaultValue={event ? event.description : ""}
          id="description"
          name="description"
          rows="5"
          required
        />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting" : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;
