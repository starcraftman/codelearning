import { useNavigate, Form, useNavigation, useActionData } from "react-router-dom";

import classes from "./EventForm.module.css";

import { json, redirect } from "react-router-dom";

export async function action({request, params}) {
    const formData = await request.formData();
    let url = "http://localhost:8080/events";
    if (request.method === "PATCH") {
      url = `http://localhost:8080/events/${params.eventId}`;
    }
    
    const response = await fetch(url,
    {
        method: request.method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title: formData.get('title'),
            image: formData.get('image'),
            date: formData.get('date'),
            description: formData.get('description'),
        })
    })
    if (response.status == 422) {
        return response;
    } else if (!response.ok) {
        return json(null, {'status': 500, statusText: "Could not save event."});
    } else {
        const data = await response.json();
        console.log('add event response', data);
        return redirect("/events");

    }
}

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
    <Form method={method} className={classes.form}>
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
