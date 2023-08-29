import React from "react";
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

export async function action({request, params}) {
    const formData = await request.formData();
    const response = await fetch("http://localhost:8080/events",
    {
        method: "POST",
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

    if (!response.ok) {
        return json(null, {'status': 500, statusText: "Could not save event."});
    } else {
        const data = await response.json();
        console.log('add event response', data);
        return redirect("/events");

    }
}

function NewEventPage() {
    return (
         <EventForm method={null} event={null} />
    );
}

export default NewEventPage;