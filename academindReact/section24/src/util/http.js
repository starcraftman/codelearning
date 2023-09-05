import { QueryClient } from "@tanstack/react-query";

const URL = `http://localhost:3000/events`;
export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max}) {
  let suffix;
  if (searchTerm && max) {
    suffix = `?search=${searchTerm}&max=${max}`
  } else if (searchTerm) {
    suffix = `?search=${searchTerm}`
  } else if (max) {
    suffix = `?max=${max}`
  }
  const response = await fetch(URL + suffix, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while submitting a new event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
    const response = await fetch(`${URL}/images`, {signal: signal});
    
      if (!response.ok) {
        const error = new Error("An error occurred while fetching the images");
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
    
      const { images } = await response.json();
      return images;
}

export async function fetchEvent({ id, signal }) {
    const response = await fetch(`${URL}/${id}`, { signal });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { event } = await response.json();
  
    return event;
  }
  
  
  export async function deleteEvent({ id }) {
    const response = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while deleting the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    return response.json();
  }

  export async function updateEvent({ id, event }) {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ event }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while updating the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    return response.json();
  }