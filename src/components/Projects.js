import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import phone from "../assets/images/contact-image-3.jpg";
import Accordion from "@mui/material/Accordion";
import { Skeleton } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import { GitHub } from "@mui/icons-material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Projects() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // env variables

  const [projects, setProjects] = React.useState();

  React.useEffect(() => {
    getProjects();
  }, []);
  const getProjectsApi = process.env.REACT_APP_GET_ALL_PROJECTS;
  const getProjects = async () => {
    try {
      const res = await axios.get(getProjectsApi);
      setProjects(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  };
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        }}
      >
        {projects ? (projects.length===0?(
          <div
            style={{
              color: "white",
              fontSize: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            No Projects found
          </div>
          ):(projects.map((e, i) => {
            return (
              <div style={{ margin: "1.7rem" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={e.name}
                    subheader={new Date(e.createdAt).toLocaleDateString(
                      "en-IN",
                      options
                    )}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={"data:image/jpeg;base64," + e.image}
                    alt="image"
                  />
                  <CardContent
                    sx={{
                      margin: "0rem",

                      fontSize: "3.1rem",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <div>
                        <ul
                          style={{
                            display: "gird",
                            marginLeft: "1rem",
                            gap: "3rem",
                            listStyle: "none",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(35px, 1fr))",
                          }}
                        ></ul>
                      </div>
                    </Typography>
                    <div
                      style={{
                        display: "grid",
                        margin: "0px",
                        placeItems: "center",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(90px, 2fr))",
                        gap: "none !important",
                      }}
                    ></div>
                  </CardContent>
                  <Accordion
                    expanded={expanded === `panel${i}`}
                    onChange={handleChange(`panel${i}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "20px !important",
                        }}
                      >
                        Description
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "0.9rem !important",
                          fontWeight: "500",
                        }}
                      >
                        {e.description}
                      </Typography>
                      <a style={{ cursor: "pointer" }} href={e.githubLink}>
                        <GitHub />
                      </a>
                      {e.contirbutors}
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </div>
            );
          }))
        ) : (
          
          Array.from({ length: 3 }).map((_, index) => {
            return (
                <div >
                  <div style={{marginTop:"2rem"}}>
                    <Skeleton
                      variant="rectangular"
                      width={"22rem"}
                      height={"4rem"}
                      sx={{
                        backgroundColor: "white",
                        // borderRadius: "0.3rem",
                      }}
                    />
                  </div>
                  <div >
                    <Skeleton
                      variant="rectangular"
                      width={"22rem"}
                      height={"14rem"}
                      sx={{
                        backgroundColor: "gray",
                        // borderRadius: "0.3rem",
                      }}
                    />
                  </div>
                  <div >
                    <Skeleton
                      variant="rectangular"
                      width={"22rem"}
                      height={"4rem"}
                      sx={{
                        backgroundColor: "white",
                        // borderRadius: "0.3rem",
                      }}
                    />
                  </div>
                </div>
            );
          })
        )}
      </div>
    </>
  );
}
