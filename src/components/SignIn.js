import { React, useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../features/snackbar/snackbar";
import { CircularProgress } from "@mui/material";
export default function Signin() {
  const navigate = useNavigate();

  const [passwordIcon, setPasswordIcon] = useState("keyboard");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.name !== "") {
        document.getElementById("username").classList.add("filled");
      } else {
        document.getElementById("username").classList.remove("filled");
      }
      if (values.email !== "") {
        document.getElementById("email").classList.add("filled");
      } else {
        document.getElementById("email").classList.remove("filled");
      }

      if (values.password !== "") {
        document.getElementById("password").classList.add("filled");
        setPasswordIcon("eye");
      } else {
        document.getElementById("password").classList.remove("filled");
        setPasswordIcon("keyboard");
      }
      if (values.nane === "") {
        errors.username = "Username required";
      }
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        )
      ) {
        errors.email = "Please enter the valid email";
      }

      if (values.password.length < 6) {
        errors.password = "Password should atleast 6 length";
      }
      return errors;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.errors.username) {
      document.getElementById("username").style.border = "0.1px solid red";

      dispatch(setSnackBar({ message: formik.errors.name, variant: "error" }));
    }
    if (formik.errors.email) {
      document.getElementById("email").style.border = "0.1px solid red";

      dispatch(setSnackBar({ message: formik.errors.email, variant: "error" }));
    }
    if (formik.errors.password) {
      document.getElementById("password").style.border = "0.1px solid red";

      dispatch(
        setSnackBar({ message: formik.errors.password, variant: "error" })
      );
    }
    if (
      !formik.errors.email &&
      !formik.errors.password &&
      !formik.errors.name
    ) {
      document.getElementById("username").style.border =
        "0.1px solid rgb(182, 178, 178)";
      document.getElementById("email").style.border =
        "0.1px solid rgb(182, 178, 178)";
      document.getElementById("password").style.border =
        "0.1px solid rgb(182, 178, 178)";
      signInUser(formik.values);
    }
  };
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const signInUser = async (e) => {
    setLoader(true);
    const signApi = process.env.REACT_APP_SIGN_UP;
    try {
      const res = await axios.post(signApi, e);
      dispatch(
        setSnackBar({ message: res.data.data.message, variant: "success" })
      );
      setLoader(false);
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (e) {
      console.log(e.response);
      if (e.response) {
        dispatch(
          setSnackBar({ message: e.response.data.err, variant: "error" })
        );
      } else {
        dispatch(
          setSnackBar({ message: "Something went wrong", variant: "error" })
        );
      }
      setLoader(false);
    }
  };

  const handlePassword = () => {
    if (passwordIcon === "eyeOn") {
      setPasswordIcon("eyeOff");
    } else {
      setPasswordIcon("eyeOn");
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
        <h2>Signin</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              name="name"
              id="username"
              required
              onChange={formik.handleChange}
            />
            <label htmlFor="name" className="labels">
              Username
            </label>
          </div>
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
          <div className="inputBox">
            <input
              type={passwordIcon === "eyeOn" ? "text" : "password"}
              id="password"
              onChange={formik.handleChange}
              name="password"
            />
            <label htmlFor="password" className="labels">
              Password
            </label>
            {passwordIcon === "keyboard" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="form-icon"
              >
                <path d="M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 320H400c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm-72-72c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16z" />
              </svg>
            ) : passwordIcon === "eyeOn" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                onClick={handlePassword}
                className="form-icon"
                style={{ height: "1rem" }}
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={handlePassword}
                className="form-icon"
                style={{ height: "1rem" }}
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            )}
          </div>

          <button type="submit" className="submit-message" disabled={loader}>
            {loader ? (
              <CircularProgress size={27} sx={{ color: "#022368" }} />
            ) : (
              "Sign up"
            )}
          </button>
          <Link to="/Auth/Login" id="already-account">
            Already have an account?
          </Link>
        </form>
      </div>
    </>
  );
}
