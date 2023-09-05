const URL = `http://localhost:3000/events`;

export async function fetchEvents({ signal, searchTerm }) {
    const suffix = searchTerm ? `?search=${searchTerm}` : "";
    const response = await fetch(URL + suffix, {signal: signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  }