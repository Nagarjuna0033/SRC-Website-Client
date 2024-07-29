import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FormControlLabel, Checkbox } from "@mui/material";
import { setSnackBar } from "../../features/snackbar/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Button } from "@mui/material";

export default function CrFeedback() {
  // Getting Environment Variables
  const postFeedbackApi = process.env.REACT_APP_ADD_FEEDBACK;

  // Creating Hooks
  const dispatch = useDispatch();
  const [copen, setCOpen] = React.useState(false);
  const [cancel, setCancel] = useState(false);
  const [loader,setLoader]=useState(false);
  const handleCClose = () => setCOpen(false);

  // Function to clear inputs
  const date = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(/\s/g, "-");
  const formik = useFormik({
    initialValues: {
      id: "",
      section: "",
      periodDetails: [{ subject: "", faculty: "", isTaken: false }],
      remarks: "",
      year: "",
      date: formattedDate,
    },
    validateOnMount: true,
  });

  const handlePeriodChange = (index, event) => {
    const updatedSubjects = [...formik.values.periodDetails];
    if (event.target.name === "isTaken") {
      updatedSubjects[index][event.target.name] = event.target.checked;
    } else {
      updatedSubjects[index][event.target.name] = event.target.value;
    }
    formik.setFieldValue("periodDetails", updatedSubjects);
  };

  const handleAddSubject = () => {
    formik.setFieldValue("periodDetails", [
      ...formik.values.periodDetails,
      { subject: "", faculty: "", isTaken: false },
    ]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = formik.values.periodDetails.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("periodDetails", updatedSubjects);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setCOpen(true);
  };

  // Function to create contact  forum

  const postFeedback = async (e) => {
    try {
      setLoader(true);
      const feedbackData = {
        id: formik.values.id,
        batch: formik.values.batch,
        year: formik.values.year,
        section: formik.values.section,
        periodDetails: formik.values.periodDetails,
        remarks: formik.values.remarks,
        date: formik.values.date,
      };
      const res = await axios.post(postFeedbackApi, feedbackData);

      dispatch(
        setSnackBar({
          message: "Successfully sent Feedback",
          variant: "success",
        })
      );

      formik.resetForm();
      setLoader(false);
    } catch (e) {
      setLoader(false);
      dispatch(
        setSnackBar({ message: "Error in sending Feedback", variant: "error" })
      );
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            open={copen}
            onClose={handleCClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {formik.values.taken
                ? "Are you sure class is taken"
                : "Are you sure class is not taken"}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setCOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  postFeedback(formik.values);
                  setCOpen(false);
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
      <section id="contact" className="cr-feedback-container">
        <div className="sub-contact-container">
          <div className="contact-head">
            <h3>Class Feedback</h3>
            <h4>We want to hear from you</h4>
          </div>
          <div className="contact-fields">
            <form onSubmit={handelSubmit}>
              <input
                type="text"
                name="id"
                placeholder="ID"
                required
                onChange={formik.handleChange}
                value={formik.values.id}
              />

              <select
                name="year"
                value={formik.values.year}
                style={{
                  height: "3rem",
                  border: "0.5px solid rgb(222,222,222)",
                  outline: "none",
                }}
                onChange={formik.handleChange}
                required
              >
                <option hidden value="">
                  Select Year
                </option>
                <option value="E1">E1</option>
                <option value="E2">E2</option>
                <option value="E3">E3</option>
                <option value="E4">E4</option>
              </select>
              <select
                name="section"
                value={formik.values.section}
                style={{
                  height: "3rem",
                  border: "0.5px solid rgb(222,222,222)",
                  outline: "none",
                }}
                onChange={formik.handleChange}
                required
              >
                <option hidden value="">
                  Select Section
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>

              {formik.values.periodDetails.map((detail, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    onChange={(e) => handlePeriodChange(index, e)}
                    value={detail.subject}
                  />
                  <input
                    type="text"
                    name="faculty"
                    placeholder="Faculty"
                    required
                    onChange={(e) => handlePeriodChange(index, e)}
                    value={detail.faculty}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isTaken"
                        onChange={(e) => handlePeriodChange(index, e)}
                        checked={detail.isTaken}
                      />
                    }
                    label="Class taken"
                  />
                  <Button onClick={() => handleRemoveSubject(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={handleAddSubject}>Add Subject</Button>
              <input
                type="text"
                name="date"
                placeholder="Subject"
                disabled
                value={formik.values.date}
              />

              <textarea
                style={{ resize: "none" }}
                placeholder="Remarks"
                name="remarks"
                cols={30}
                rows={7}
                onChange={formik.handleChange}
                value={formik.values.remarks}
              ></textarea>
              <button
                className="submit-message"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={27} sx={{ color: "#022368" }} />
                ) : (
                  "Send Feedback"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
