import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { GroupView } from "./pages/group-view";
import { CreateEvent } from "./pages/create-event";
import { Notifications } from "./pages/notifications";
import { CalendarView } from "./pages/calendar-view";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/calendar",
    Component: CalendarView,
  },
  {
    path: "/group/:id",
    Component: GroupView,
  },
  {
    path: "/group/:id/create-event",
    Component: CreateEvent,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
]);