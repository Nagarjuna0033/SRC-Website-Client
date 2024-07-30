import { React, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../features/snackbar/snackbar";
import { CircularProgress } from "@mui/material";
export default function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.email !== "") {
        document.getElementById("email").classList.add("filled");
      } else {
        document.getElementById("email").classList.remove("filled");
      }

      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        )
      ) {
        errors.email = "Please enter the valid email";
      }

      return errors;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.errors.email) {
      document.getElementById("email").style.border = "0.1px solid red";

      // showToast(formik.errors.email, "warn");
      dispatch(setSnackBar({ message: formik.errors.email, variant: "error" }));
    }

    if (!formik.errors.email && !formik.errors.password) {
      document.getElementById("email").style.border =
        "0.1px solid rgb(182, 178, 178)";

      verifyUser(formik.values);
    }
  };
  const verifyUser = async (e) => {
    setLoader(true);
    const forgotApi = process.env.REACT_APP_FORGOT_PASSWORD;
    try {
      const res = await axios.get(forgotApi + e.email);
      setLoader(false);
      dispatch(
        setSnackBar({
          message: "Reset link sent to your mail",
          variant: "success",
        })
      );
    } catch (e) {
      setLoader(false);
      console.log(e);
      dispatch(setSnackBar({ message: "user not found", variant: "error" }));
    }
  };

  return (
    <>
      <div id="background"></div>
      <div id="card">
        <img
          src="https://media.licdn.com/dms/image/D560BAQGeX5IypKPgKA/company-logo_200_200/0/1714503367832/src_rgukt_rkvalley_logo?e=2147483647&v=beta&t=VaD731Pnd5Lt2gtyglJxyOJwUvjsOATqQCeXi6k-qS0"
          alt=""
          id="loginLogo"
        />
        <h2>Forgot Password</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={formik.handleChange}
            />
            <label htmlFor="email" className="labels">
              Email
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="form-icon"
            >
              <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
          </div>

          {loader ? (
            <button className="submit-message" disabled={loader}>
              <CircularProgress size={27} sx={{ color: "#022368" }} />
            </button>
          ) : (
            <button className="submit-message">verify</button>
          )}
          <Link to="/Auth/Signin" id="sign-account">
            Don't have an account?
          </Link>
        </form>
      </div>
    </>
  );
}

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
