import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as eventDetailAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsPageLoader } from "./pages/Events";
import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import ErrorPage from "./pages/Error";
import { action as eventFormAction } from "./components/EventForm";
import NewsletterPage, { action as newsLetterAction } from "./pages/Newsletter";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsLetterAction,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsPageLoader,
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventFormAction,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventFormAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
