import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

function EditEventPage() {
    const data = useRouteLoaderData('event-details');
    console.log(data);
    return (
        <EventForm method="POST" event={data.event} />
    );
}

export default EditEventPage;