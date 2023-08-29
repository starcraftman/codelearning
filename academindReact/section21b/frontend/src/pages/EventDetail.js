import React from "react";
import { useParams, json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export async function loader({request, params}) {
    console.log('loader details');
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
    if (!response.ok) {
        return json(null, {'status': 500, statusText: "Could not fetch event details"});
    } else {
        const data = await response.json();
        console.log(data);
        return data;
        // return response;
    }
}

function EventDetailPage() {
    const data = useRouteLoaderData('event-details');
    console.log('d', data);
    
    return (
        <EventItem event={data.event} />
    );
}

export default EventDetailPage;