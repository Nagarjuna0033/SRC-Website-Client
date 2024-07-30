import { React, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function ClassDeatils() {
  const [loader, setLoader] = useState(false);
  const [feedbacks, setFeedbacks] = useState({
    check: false,
    details: null,
  });
  //   env varaibles

  const getAllFeedbacksApi = process.env.REACT_APP_GET_ALL_FEEDBACKS;
  const getAllFeedbacksCollectionByFilterApi =
    process.env.REACT_APP_GET_FEEDBACK_COLLECTION_BY_FILTER;

  const formik = useFormik({
    initialValues: {
      year: "",
      date: "",
      section: "",
    },
  });
  const getDetails = async (e) => {
    e.preventDefault();
    const date = encodeURIComponent(formik.values.date); // Encode the date
    setFeedbacks({ check: true, details: null });

    try {
      setLoader(true);
      const res = await axios.get(
        getAllFeedbacksCollectionByFilterApi +
          `?${formik.values.year ? `year=${formik.values.year}` + "&" : ""}${
            formik.values.section
              ? `section=${formik.values.section}` + "&"
              : ""
          }${
            formik.values.date
              ? `date=${formik.values.date.replace(/ /g, "-")}`
              : ""
          }`
      );
      formik.resetForm();
      setFeedbacks({ check: false, details: res.data });
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      setFeedbacks({ check: false, details: null });
    }
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <div className="sub-contact-container" style={{ marginTop: "1.1rem" }}>
        <div className="contact-head">
          <h2>Select Details</h2>
        </div>
        <div className="contact-fields  add-carousel-item ">
          <form onSubmit={getDetails}>
            <select
              name="year"
              id="domain"
              //   value={formik.values.domain}
              style={{
                height: "3rem",
                border: "0.5px solid rgb(222,222,222)",
                outline: "none",
              }}
              onChange={formik.handleChange}
            >
              <option value="">Select Year</option>
              <option value={"E1"}>E1</option>
              <option value={"E2"}>E2</option>
              <option value={"E3"}>E3</option>
              <option value={"E4"}>E4</option>
            </select>
            <select
              name="section"
              id="domain"
              //   value={formik.values.domain}
              style={{
                height: "3rem",
                border: "0.5px solid rgb(222,222,222)",
                outline: "none",
              }}
              onChange={formik.handleChange}
            >
              <option value="">Select Section</option>
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
              <option value={"D"}>D</option>
              <option value={"E"}>E</option>
              <option value={"F"}>F</option>
            </select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="From">
                <DatePicker
                  name="date"
                  value={
                    formik.values.date
                      ? dayjs(formik.values.date, "DD MMM YYYY")
                      : null
                  }
                  onChange={(date) =>
                    formik.setFieldValue("date", date.format("DD MMM YYYY"))
                  }
                />
              </DemoItem>
            </LocalizationProvider>
            <button className="submit-message" type="submit" disabled={loader}>
              {loader ? (
                <CircularProgress size={27} sx={{ color: "#022368" }} />
              ) : (
                "Get Details"
              )}
            </button>
          </form>
        </div>
      </div>
      <div>
        {feedbacks.check ? (
          Array.from({ length: 5 }).map(() => {
            return (
              <div style={{ marginTop: "1.1rem" }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    backgroundColor: "gray",
                    borderRadius: "0.3rem",
                    height: "4rem",
                  }}
                />
              </div>
            );
          })
        ) : (
          <div style={{ marginTop: "1.1rem" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Subject</StyledTableCell>
                    <StyledTableCell>Faculty</StyledTableCell>
                    <StyledTableCell align="right">isTaken</StyledTableCell>
                    <StyledTableCell align="right">Year</StyledTableCell>
                    <StyledTableCell align="right">Section</StyledTableCell>
                    <StyledTableCell align="right">ID</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.details &&
                  feedbacks.details.classfeedbacks.length > 0 ? (
                    feedbacks.details.classfeedbacks.map((row) =>
                      row.periodDetails.map((ele, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {ele.subject}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {ele.faculty}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {ele.isTaken ? "Taken" : "Not taken"}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.year}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.section}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.date}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    )
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        No Feedbacks found
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {feedbacks.details &&
                  feedbacks.details.classfeedbacks.length > 0 && (
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">Section</StyledTableCell>
                        <StyledTableCell align="right">ID</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Remarks</StyledTableCell>
                      </TableRow>
                    </TableHead>
                  )}
                <TableBody>
                  {feedbacks.details &&
                  feedbacks.details.classfeedbacks.length > 0
                    ? feedbacks.details.classfeedbacks.map((row) => (
                        <StyledTableRow key={row.remarks}>
                          <StyledTableCell align="right">
                            {row.section}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.date}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.remarks === "" ? "-" : row.remarks}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}
