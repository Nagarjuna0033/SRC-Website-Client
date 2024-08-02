import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Userprofile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import user, { loggedStatus } from "../features/user/user";
import { setSnackBar } from "../features/snackbar/snackbar";
import { CircularProgress } from "@mui/material";
export default function UserProfile() {
  // getting username from navbar

  const { username } = useParams();

  // Icons for editing and saving

  const [icon, setIcon] = useState(true);
  const [edit, setEdit] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loader, setLoader] = useState(false);
  // hook for navigating

  const navigate = useNavigate();

  // edit fields function

  // const editFields = (e) => {

  // };
  // File handling

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    profileFormik.setFieldValue("image", file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const upload = () => {
    fileInputRef.current.click();
  };

  // env varibales
  const getUserProfileApi = process.env.REACT_APP_GET_USER_PROFILE_BY_EMAIL;
  const updateUserInfoApi =
    process.env.REACT_APP_UPDATE_USER_DETAILS_BY_ID_DONE_BY_USER;
  const updateUserModelApi = process.env.REACT_APP_UPDATE_USER_DETAILS;
  // getting email from store

  const email = useSelector((state) => state.logStatus.email);
  const role = useSelector((state) => state.logStatus.role);
  const authToken = useSelector((state) => state.logStatus.authToken);
  const name = useSelector((state) => state.logStatus.name);
  const logged = useSelector((state) => state.logStatus.logged);
  const isCr = useSelector((state) => state.logStatus.isCr);
  useEffect(() => {
    getUser();
  }, []);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.get(getUserProfileApi + email);
      localStorage.setItem("username", res.data.name);
      dispatch(
        loggedStatus({
          logged: true,
          token: authToken,
          name: res.data.name,
          role: role,
          email: email,
          isCr: isCr,
        })
      );
      setUserInfo(res.data);
      formik.setFieldValue("_id", res.data._id);
      formik.setFieldValue("name", res.data.name);
      formik.setFieldValue("gfg", res.data.gfg ? res.data.gfg : "");
      formik.setFieldValue(
        "linkedin",
        res.data.linkedin ? res.data.linkedin : ""
      );
      formik.setFieldValue("github", res.data.github ? res.data.github : "");
      formik.setFieldValue(
        "leetcode",
        res.data.leetcode ? res.data.leetcode : ""
      );
      formik.setFieldValue("img", res.data.img ? res.data.img : "");
    } catch (e) {
      console.log(e);
    }
  };

  // Formik init

  const profileFormik = useFormik({
    initialValues: {
      image: "",
    },
  });
  const formik = useFormik({
    initialValues: {
      _id: userInfo && userInfo._id,
      name: userInfo && userInfo.name,
      gfg: "",
      leetcode: "",
      github: "",

      linkedin: "",
      role: userInfo && userInfo.role,
    },
    validateOnMount: true,

    validate: (values) => {
      let errors = {};
      return errors;
    },
  });
  // Handling form submit
  const handleProfilePic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", profileFormik.values.image);
    try {
      setLoader(true);
      console.log(profileFormik.values);
      const res = await axios.put(
        `${updateUserInfoApi}${formik.values._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (formik.values)
        // const res = await axios.put()
        getUser();
      dispatch(
        setSnackBar({
          message: "Successfully updated Profile Picture",
          variant: "success",
        })
      );
      setLoader(false);
      profileFormik.resetForm();
    } catch (e) {
      dispatch(
        setSnackBar({
          message: "Error in updating Profile Pic",
          variant: "error",
        })
      );
      profileFormik.resetForm();
      console.log(e);
      setLoader(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!icon) {
      try {
        setLoader(true);
        const res = await axios.put(
          updateUserInfoApi + formik.values._id,
          formik.values
        );

        const data = { name: formik.values.name };
        const res1 = await axios.put(
          updateUserModelApi + userInfo.userId,
          data
        );

        setEdit(!edit);
        setIcon(!icon);
        dispatch(
          setSnackBar({
            message: "Successfully updated details",
            variant: "success",
          })
        );
        setLoader(false);
        getUser();
      } catch (e) {
        dispatch(
          setSnackBar({
            message: "error in updating details",
            variant: "error",
          })
        );
      }
      setLoader(false);
    } else {
      setEdit(!edit);
      setIcon(!icon);
      setLoader(false);
    }
  };
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  const getImageSrc = () => {
    if (userInfo && userInfo.image) {
      return isValidUrl(userInfo.image)
        ? userInfo.image
        : `data:image/jpeg;base64,${userInfo.image}`; // Assuming binary data is base64 encoded
    }
  };
  return (
    <>
      <div className="profile-container">
        <div className="profile-name-img">
          <div className="profile-wrapper">
            <img src={userInfo && getImageSrc()} alt="" srcset="" />
            <div className="edit-profile-pic">
              {!profileFormik.values.image ? (
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="profile-edit-camera"
                  onClick={upload}
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : loader ? (
                <button className="submit-message" disabled={loader}>
                  <CircularProgress size={27} sx={{ color: "#022368" }} />
                </button>
              ) : (
                <button
                  onClick={handleProfilePic}
                  disabled={loader}
                  className="submit-message"
                >
                  {" "}
                  Save
                </button>
              )}
            </div>
            <div className="profile-name">{name}</div>
          </div>
          <div id="reset-btn">
            <button
              className="reset-password-btn"
              onClick={() => {
                navigate("/Auth/reset/password");
              }}
            >
              Reset Password
            </button>
          </div>

          {/* <div className="profile-score">
            <div>Score</div>
            <div>992</div>
          </div> */}
        </div>
        <form>
          <div className="profile-details-container">
            <div className="profile-details">
              <div className="edit-icon">
                <form onSubmit={handleProfilePic}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="image"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </form>
                {/* <button
                  className="submit-message"
                  type="submit"
                  disabled={loader}
                ></button> */}
                <button
                  onClick={handleSubmit}
                  disabled={loader}
                  id="edit-btn"
                  className="submit-message"
                >
                  {icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      id="edit-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : loader ? (
                    <button
                      disabled={loader}
                      className="submit-message"
                      id="edit-btn"
                    >
                      <CircularProgress size={27} sx={{ color: "#022368" }} />
                    </button>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>

              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    className="edit-inputs"
                    disabled={edit}
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>

              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Leetcode">Leetcode</label>
                  <input
                    type="text"
                    value={formik.values.leetcode}
                    onChange={formik.handleChange}
                    className="edit-inputs"
                    disabled={edit}
                    name="leetcode"
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>

              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Github">Github</label>
                  <input
                    type="text"
                    value={formik.values.github}
                    name="github"
                    onChange={formik.handleChange}
                    className="edit-inputs"
                    disabled={edit}
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>

              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Github">Email</label>
                  <input
                    type="text"
                    value={email}
                    name="github"
                    className="edit-inputs"
                    disabled
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>

              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Geeks for geeks">Geeks for Geeks</label>
                  <input
                    type="text"
                    name="gfg"
                    value={formik.values.gfg}
                    className="edit-inputs"
                    disabled={edit}
                    onChange={formik.handleChange}
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>
              <div className="profile-details-item">
                <div className="profile-input-field">
                  <label htmlFor="Geeks for geeks">Linkedin</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formik.values.linkedin}
                    className="edit-inputs"
                    disabled={edit}
                    onChange={formik.handleChange}
                    style={edit ? { cursor: "not-allowed" } : {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
