// import React, { useEffect, useState } from "react";
// import { Carousel } from "react-responsive-carousel";
// import { changeDomainData } from "../features/carousel/carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { Skeleton } from "@mui/material";

// export default function Carousal() {
//   // init of variables

//   const getAllCarouselsApi = process.env.REACT_APP_GET_ALL_CAROUSEL;
//   // init React hooks

//   const dispatch = useDispatch();
//   const [domain, setDomain] = useState(null);
//   const [carousels, setCarousels] = useState(null);
//   const location = useLocation();
//   const { domainName } = useParams();
//   const domainId = useSelector((state) => state.domainData.domainId);
//   // useEffect for getting domains

//   useEffect(() => {
//     getDomains();
//     getAllCarousels();
//   }, [location]);

//   // Init of variables

//   const getDomainsApi = process.env.REACT_APP_GET_DOMAINS;

//   // Function for getting domains

//   const getDomains = async () => {
//     try {
//       const res = await axios.get(getDomainsApi);
//       setDomain(res.data);
//       if (location.pathname === "/") {
//         dispatch(changeDomainData({ introText: introText, domainId: "" }));
//       } else {
//         res.data.map((item) => {
//           if (item.name === domainName) {
//             dispatch(
//               changeDomainData({
//                 introText: item.description,
//                 domainId: item._id,
//               })
//             );
//           }
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   // Function to get all carousels

//   const getAllCarousels = async () => {
//     try {
//       const res = await axios.get(getAllCarouselsApi);
//       setCarousels(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const introText =
//     "Welcome to the SRC (Student Recreation Center), a dynamic club initiated by the Computer Science department of RGUKT RK Valley in 2024. Our mission is to foster increased interaction between seniors and juniors, promoting a culture of mutual learning, collaboration, and support within our college community.\n Our Mission Our Mission At SRC, we believe in the power of community and the importance of shared experiences. Our primary goal is to bridge the gap between different batches of students, enabling them to learn from each other, grow together, and create lasting bonds.\nRegular Activities Weekly Coding Contests: Every week, we organize coding contests that challenge our members to hone their programming skills. These contests are designed to be both fun and educational, providing a competitive yet friendly environment for all participants.";

//   return (
//     <div>
//       <center>
//         <Carousel
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop={true}
//           showArrows={true}
//           useKeyboardArrows={true}
//           autoPlay={true}
//           stopOnHover={true}
//           transitionTime={1000}
//           width="95%"
//         >
//   {carousels
//     ? carousels
//         .filter((item) => {
//           if (location.pathname === "/" && !item.domainId) {
//             return true;
//           }
//           if (location.pathname !== "/" && item.domainId === domainId) {
//             return true;
//           }
//           return false;
//         })
//         .map((item) => {
//           return (
//             <div
//               key={item._id}
//               className="slide-holder"
//               style={{
//                 background: `url(${
//                   "data:image/jpeg;base64," + item.image
//                 })`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "cover",
//                 backgroundPosition: "50% 50%",
//               }}
//             >
//               <div className="text-container">
//                 <h2>{item.title}</h2>
//                 <p>{item.description}</p>
//               </div>
//             </div>
//           );
//         })
//     : Array.from({ length: 1 }).map((_, index) => {
//         return (
//           <div key={index}>
//             <Skeleton
//               variant="rectangular"
//               width={"100vw"}
//               height={"25rem"}
//               sx={{
//                 backgroundColor: "gray",
//               }}
//             />
//           </div>
//         );
//       })}
// </Carousel>
// <div className="carousal-content">
//   <h2>Welcome to SRC</h2>
//   <h4>{useSelector((state) => state.domainData.introText)}</h4>
// </div>
//       </center>
//     </div>
//   );
// }

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { changeDomainData } from "../features/carousel/carousel";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleMouseEnter = () => {
    setAutoPlayEnabled(false);
  };

  const handleMouseLeave = () => {
    setAutoPlayEnabled(true);
  };

  const getAllCarouselsApi = process.env.REACT_APP_GET_ALL_CAROUSEL;
  // init React hooks

  const dispatch = useDispatch();
  const [domain, setDomain] = useState(null);
  const [carousels, setCarousels] = useState(null);
  const location = useLocation();
  const { domainName } = useParams();
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const domainId = useSelector((state) => state.domainData.domainId);
  // useEffect for getting domains

  useEffect(() => {
    getDomains();
    getAllCarousels();
  }, [location]);

  // Init of variables

  const getDomainsApi = process.env.REACT_APP_GET_DOMAINS;

  // Function for getting domains

  const getDomains = async () => {
    try {
      const res = await axios.get(getDomainsApi);
      setDomain(res.data);
      if (location.pathname === "/") {
        dispatch(changeDomainData({ introText: introText, domainId: "" }));
      } else {
        res.data.map((item) => {
          if (item.name === domainName) {
            dispatch(
              changeDomainData({
                introText: item.description,
                domainId: item._id,
              })
            );
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Function to get all carousels

  const getAllCarousels = async () => {
    try {
      const res = await axios.get(getAllCarouselsApi);
      setCarousels(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const introText =
    "Welcome to the SRC (Student Recreation Center), a dynamic club initiated by the Computer Science department of RGUKT RK Valley in 2024. Our mission is to foster increased interaction between seniors and juniors, promoting a culture of mutual learning, collaboration, and support within our college community.\n Our Mission Our Mission At SRC, we believe in the power of community and the importance of shared experiences. Our primary goal is to bridge the gap between different batches of students, enabling them to learn from each other, grow together, and create lasting bonds.\nRegular Activities Weekly Coding Contests: Every week, we organize coding contests that challenge our members to hone their programming skills. These contests are designed to be both fun and educational, providing a competitive yet friendly environment for all participants.";

  return (
    <>
      <Box
        sx={{ maxWidth: "100%" }}
        className="carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents={true}
          autoPlay={autoPlayEnabled}
          interval={5000}
        >
          {carousels
            ? carousels
                .filter((item) => {
                  if (location.pathname === "/" && !item.domainId) {
                    return true;
                  }
                  if (location.pathname !== "/" && item.domainId === domainId) {
                    return true;
                  }
                  return false;
                })
                .map((item, index) => {
                  return (
                    <div key={item.text} className="carousel-item">
                      {Math.abs(activeStep - index) <= 2 ? (
                        <>
                          <Box
                            component="img"
                            sx={{
                              height: 375,
                              display: "block",
                              maxWidth: "100%",
                              overflow: "hidden",
                              width: "100%",
                            }}
                            className="carousel-item-image"
                            src={"data:image/jpeg;base64," + item.image}
                            alt={item.label}
                          />
                          <div className="text-container">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })
            : Array.from({ length: 1 }).map((_, index) => {
                return (
                  <div key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={"100vw"}
                      height={"25rem"}
                      sx={{
                        backgroundColor: "gray",
                      }}
                    />
                  </div>
                );
              })}
        </AutoPlaySwipeableViews>

        {/* <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        /> */}
      </Box>
      <div className="carousal-content">
        <h2>Welcome to SRC</h2>
        <h4>{useSelector((state) => state.domainData.introText)}</h4>
      </div>
    </>
  );
}

export default SwipeableTextMobileStepper;
