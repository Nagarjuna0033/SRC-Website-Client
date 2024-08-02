import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSnackBar } from "../features/snackbar/snackbar";
import { CircularProgress } from "@mui/material";
export default function UserVerify() {
  const dispatch = useDispatch();
  // Env variables
  const userVerifyApi = process.env.REACT_APP_USER_VERIFICATION;
  const [loader, setLoader] = useState(false);
  let { authToken } = useParams();
  const handleUserVerification = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${userVerifyApi + authToken}`);
      dispatch(
        setSnackBar({
          message: "Verification success. Please login",
          variant: "success",
        })
      );
      setLoader(false);
    } catch (e) {
      console.log(e);
      dispatch(
        setSnackBar({
          message: "Verification failed. Try Again",
          variant: "error",
        })
      );
      setLoader(false);
    }
  };
  return (
    <React.Fragment>
      <div className="user-verify-container">
        {/* <button className="user-verify-button" onClick={handleUserVerification}>
          Verify User
        </button> */}
        {loader ? (
          <button
            className="user-verify-button submit-message"
            disabled={loader}
          >
            <CircularProgress size={27} sx={{ color: "#022368" }} />
          </button>
        ) : (
          <button
            className="user-verify-button submit-message"
            onClick={handleUserVerification}
          >
            Verify User
          </button>
        )}
      </div>
    </React.Fragment>
  );
}
