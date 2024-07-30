import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import "../../styles/Login.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../features/snackbar/snackbar";
export default function DomainForm() {
  // Calling getAllDomains in useEffect
  const dispatch = useDispatch();
  useEffect(() => {
    getAllDomains();
  }, []);

  // Getting Environment Variables

  const getDomainApi = process.env.REACT_APP_GET_DOMAINS;
  const addDomainApi = process.env.REACT_APP_CREATE_DOMAIN;
  const deleteDomainApi = process.env.REACT_APP_DELETE_DOMAIN_BY_ID;

  const updateDomainApi = process.env.REACT_APP_UPDATE_DOMAIN_BY_ID;

  // init of React Hooks

  const [domains, setDomains] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const [cancel, setCancel] = useState(false);
  const [copen, setCOpen] = React.useState(false);

  const handleCClose = (type) => setCOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
    },
    validateOnMount: true,

    validate: (values) => {
      let errors = {};

      if (values.name === "") {
        errors.name = "Please enter the valid Domain Name";
      }

      if (values.description === "") {
        errors.description = "Description requried";
      }
      return errors;
    },
  });

  //  Functions for CRUD

  // Function to get All Domains

  const getAllDomains = () => {
    try {
      axios.get(getDomainApi).then((res) => {
        setDomains(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const editDomain = () => {
    setCOpen(false);
    formik.setFieldValue("name", update.domain.name);
    formik.setFieldValue("description", update.domain.description);
    setCancel(true);
  };
  // Function for Handling Form

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formik.errors.name) {
      document.getElementById("domain-name").style.border = "1px solid red";
    }
    if (formik.errors.description) {
      document.getElementById("domain-desc").style.border = "1px solid red";
    }
    if (!formik.errors.name && !formik.errors.description) {
      document.getElementById("domain-name").style.border = "none";
      document.getElementById("domain-desc").style.border = "none";

      addDomain(formik.values);
    }
  };

  // Function for Adding Domain

  const addDomain = async (e) => {
    try {
      setLoader(true);
      const res = await axios.post(addDomainApi, e, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("authToken")
            .slice(1, localStorage.getItem("authToken").length - 1)}`,
        },
      });
      formik.resetForm();
      dispatch(
        setSnackBar({
          message: "Domain Created Successfully",
          variant: "success",
        })
      );
      formik.resetForm();
      getAllDomains();
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      dispatch(
        setSnackBar({
          message: "Error Creating in domain",
          variant: "error",
        })
      );
    }
  };

  // Function for Updating Domain

  const updateDomain = async (e) => {
    e.preventDefault();
    setCancel(false);
    try {
      setLoader(true);

      const res = await axios.put(
        updateDomainApi + update.domain._id,
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("authToken")
              .slice(1, localStorage.getItem("authToken").length - 1)}`,
          },
        }
      );
      dispatch(
        setSnackBar({
          message: "Domain Updated Successfully",
          variant: "success",
        })
      );
      getAllDomains();
      setUpdate(false);
      formik.resetForm();
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      dispatch(
        setSnackBar({
          message: "Error updating in domain",
          variant: "error",
        })
      );
    }
  };

  // Function for Deleting Domains

  const deleteDomain = async () => {
    try {
      const res = await axios.delete(deleteDomainApi + update.domain._id, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("authToken")
            .slice(1, localStorage.getItem("authToken").length - 1)}`,
        },
      });
      // showToast("Domain Deleted Successfully", "success");
      dispatch(
        setSnackBar({
          message: "Domain Deleted Successfully",
          variant: "success",
        })
      );
      getAllDomains();
    } catch (e) {
      console.log(e);
      dispatch(
        setSnackBar({
          message: "Error in Deleting Domain",
          variant: "error",
        })
      );
    }
    setCOpen(false);
  };

  // Custom Styles

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "white" }}>
          <div>
            <React.Fragment>
              <Dialog
                open={copen}
                onClose={handleCClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {update.check ? "Edit Domain" : "Delete Domain"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {update.check
                      ? "You are about to edit this domian.Modify the details in following form"
                      : "You are about to delete this domian. This action is irreversible. Do you wish to proceed?"}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setUpdate({ check: false, domain: "" });
                      setCOpen(false);
                      setCancel(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={update.check ? editDomain : deleteDomain}>
                    {update.check ? "Edit" : "Delete"}
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
          <Grid>
            <Typography
              sx={{ color: "white", mx: 1, my: 1 }}
              variant="h5"
              component="div"
            >
              Current Domains
            </Typography>
            <Demo sx={{ borderRadius: "0.5rem", marginTop: "1.5rem" }}>
              <List sx={{ padding: "0px" }}>
                {domains &&
                  domains.map((item) => {
                    return (
                      <ListItem
                        key={item._id}
                        sx={{ borderBottom: "1px solid grey", padding: "14px" }}
                      >
                        <div style={{ color: "black" }}>
                          <div
                            style={{ fontWeight: "bold", marginBottom: "1rem" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontSize: "1.3rem" }}>
                                {item.name}
                              </div>
                              <div>
                                <IconButton
                                  edge="end"
                                  aria-label="edit"
                                  sx={{ marginRight: "0.5rem" }}
                                >
                                  <EditNoteRoundedIcon
                                    onClick={() => {
                                      setCOpen(true);
                                      // setCarItem(item);
                                      setUpdate({ check: true, domain: item });
                                    }}
                                  />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon
                                    onClick={() => {
                                      setCOpen(true);
                                      // setCarItem(item);
                                      setUpdate({ check: false, domain: item });
                                    }}
                                  />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                          <div>{item.description}</div>
                        </div>
                      </ListItem>
                    );
                  })}
              </List>
            </Demo>
          </Grid>
        </div>

        <div className="sub-contact-container" style={{ marginTop: "1.5rem" }}>
          <div className="contact-head">
            <div>
              <h3>{update.check ? "Update Domain" : "Add Domain"}</h3>
              {cancel ? (
                <button
                  onClick={() => {
                    setUpdate(false);
                    formik.resetForm();
                    setLoader(false);
                    setCancel(false);
                  }}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="contact-fields">
            <form onSubmit={update ? updateDomain : handleSubmit}>
              <input
                type="text"
                required
                value={formik.values.name}
                name="name"
                placeholder="Domain Name"
                onChange={formik.handleChange}
              />
              <input
                type="text"
                required
                value={formik.values.image}
                name="image"
                placeholder="Domain Name"
                onChange={formik.handleChange}
              />
              <textarea
                style={{ resize: "none" }}
                placeholder="Description about Domain"
                value={formik.values.description}
                name="description"
                required
                cols={30}
                rows={7}
                onChange={formik.handleChange}
              ></textarea>

              {loader ? (
                <button className="submit-message" disabled={loader}>
                  <CircularProgress size={27} sx={{ color: "#022368" }} />
                </button>
              ) : (
                <button className="submit-message">
                  {update ? "update Domain" : "Add Domain"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
