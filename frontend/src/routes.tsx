import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectAuthUser } from "./services/auth/AuthSelectors";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainNavbar from "./pages/components/MainNavbar";
import Feedback from "./pages/Feedback/Feedback";
import EditUserInputForm from "./pages/Feedback/components/EditUserInputForm";

const login = "/login";
const dashboard = "/dashboard";
const dashboardFeedback = "/dashboard/feedback";
const dashboardFeedbackEdit = "/dashboard/feedback/edit";
const dashboardHome = "/dashboard/home";
const all = "*";

const links = [
  {
    name: "Feedback",
    path: dashboardFeedback,
  },
  {
    name: "Dashboard",
    path: dashboardHome,
  },
];

function AppRouter() {
  const user = useAppSelector(selectAuthUser);
  const loggedIn = user ? true : false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={login}
          element={!loggedIn ? <Login /> : <Navigate to={dashboardFeedback} />}
        />
        <Route
          path={dashboard}
          element={
            user !== null ? (
              <MainNavbar user={user} links={links} />
            ) : (
              <Navigate to={login} />
            )
          }
        >
          <Route path={dashboardHome} element={<Dashboard />} />
          <Route path={dashboardFeedback} element={<Feedback />} />
          <Route
            path={`${dashboardFeedbackEdit}/:id`}
            element={<EditUserInputForm />}
          />
        </Route>
        <Route path={all} element={<Navigate to={login} />} />
      </Routes>
    </BrowserRouter>
  );
}

export {
  login,
  dashboard,
  dashboardFeedback,
  dashboardFeedbackEdit,
  dashboardHome,
  all,
};
export default AppRouter;