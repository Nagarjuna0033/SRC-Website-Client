import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Events from "./components/Events";
import EventInfo from "./components/EventInfo";
import About from "./components/About";
import Projects from "./components/Projects";
import { Route, Routes } from "react-router-dom";
import Domains from "./components/Domains";
import UserProfile from "./components/UserProfile";
import UserDetails from "./components/UserDetails";
import Signin from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import AdminPage from "./components/Admin_op/AdminPage";
import UserVerify from "./components/UserVerify";
import SnackbarListener from "./components/SnackBarListener";
import { SnackbarProvider } from "notistack";
import Error from "./components/Utils/Error";
import UsersProfile from "./components/UsersProfile";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./components/Utils/ResetPassword";
import { isTokenExpired } from "./components/Utils/Auth";
import { loggedStatus } from "./features/user/user";
import CrFeedback from "./components/Admin_op/CrFeedback";
import CarouselForm from "./components/Admin_op/CarouselForm";
import DomainForm from "./components/Admin_op/DomainForm";
import NewsForm from "./components/Admin_op/NewsForm";
import Officials from "./components/Admin_op/Officials";
import Testimonals from "./components/Admin_op/Testimonals";
import Cr from "./components/Admin_op/Cr";
import CompletedEventForum from "./components/Admin_op/CompletedEventForum";
import ProjectForm from "./components/Admin_op/ProjectForm";
import ResourceForm from "./components/Admin_op/ResourceForm";
import ContactForum from "./components/Admin_op/ContactForum";
import Feedback from "./components/Admin_op/Feedback";
import Coordinators from "./components/Admin_op/Coordinators";
import UpcomingEventForm from "./components/Admin_op/UpcomingEventForm";
import { useState } from "react";
import NetworkError from "./components/Utils/NetworkError";
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.logStatus.role);
  const logged = useSelector((state) => state.logStatus.logged);
  const isCr = useSelector((state) => state.logStatus.isCr);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      if (isTokenExpired(localStorage.getItem("authToken"))) {
        dispatch(
          loggedStatus({
            logged: false,
            token: "",
            name: "",
            role: "",
            email: "",
            isCr: false,
          })
        );
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
      }
    }
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [role]);

  return (
    <>
      {isOnline ? (
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
        >
          <SnackbarListener />

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Auth/Signin" element={<Signin />} />
            <Route path="/Details" element={<UserDetails />} />
            <Route path="/Auth/Login" element={<Login />} />
            {/* Admin Routes */}
            <Route
              path="/Admin"
              element={logged && role === "admin" ? <AdminPage /> : <Error />}
            >
              <Route index element={<CarouselForm />} />
              <Route path="carousel" element={<CarouselForm />} />
              <Route path="domain" element={<DomainForm />} />
              <Route path="news" element={<NewsForm />} />
              <Route path="officials" element={<Officials />} />
              <Route path="coordinators" element={<Coordinators />} />
              <Route path="testimonials" element={<Testimonals />} />
              <Route path="cr" element={<Cr />} />
              <Route
                path="completed-events"
                element={<CompletedEventForum />}
              />
              <Route path="upcoming-events" element={<UpcomingEventForm />} />
              <Route path="projects" element={<ProjectForm />} />
              <Route path="resources" element={<ResourceForm />} />
              <Route path="contact-forum" element={<ContactForum />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>
            <Route path="/Auth/forgot/password" element={<ForgotPassword />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Events/:eventName" element={<EventInfo />} />
            <Route path="/Domain/:domainName" element={<Domains />} />
            <Route
              path="/Profile/:username"
              element={logged ? <UserProfile /> : <Error />}
            />
            <Route
              path="/user/Profile/:email"
              element={logged ? <UsersProfile /> : <Error />}
            />
            <Route path="/About" element={<About />} />
            <Route path="/user/verify/:authToken" element={<UserVerify />} />
            <Route
              path="/Auth/reset/password"
              element={logged ? <ResetPassword /> : <Error />}
            />
            <Route
              path="/Auth/reset/password/:authToken"
              element={<ResetPassword />}
            />
            <Route
              path="/CR/feedback"
              element={isCr ? <CrFeedback /> : <Error />}
            />
          </Routes>
          <Footer />
        </SnackbarProvider>
      ) : (
        <NetworkError />
      )}
    </>
  );
}

export default App;
