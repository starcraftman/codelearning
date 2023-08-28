import React from "react";
import { useParams } from "react-router-dom";

function EventDetailPage() {
    const params = useParams();

    return (
        <h1>Details For Event: {params.eventId}</h1>
    );
}

export default EventDetailPage;