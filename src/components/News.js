import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/src_logo.png";
import "react-vertical-timeline-component/style.min.css";
import "../styles/News.css";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import { Skeleton } from "@mui/material";
export default function EventsDemo() {
  const containerRef = useRef();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [newsModal, setNewsModal] = useState();
  // useEffect(() => {
  //   const container = containerRef.current;

  //   const disableScroll = () => {
  //     document.addEventListener("wheel", preventDefault, { passive: false });
  //   };

  //   const enableScroll = () => {
  //     document.removeEventListener("wheel", preventDefault, false);
  //   };

  //   if (container) {
  //     container.addEventListener("mouseenter", disableScroll);
  //     container.addEventListener("mouseleave", enableScroll);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener("mouseenter", disableScroll);
  //       container.removeEventListener("mouseleave", enableScroll);
  //     }
  //     enableScroll();
  //   };
  // }, []);

  const jump = (e) => {
    const container = document.getElementById("jump");
    container.scrollLeft += e.deltaY;
  };
  // const enableScroll = () => {
  //   document.removeEventListener("wheel", preventDefault, false);
  // };
  // const disableScroll = () => {
  //   document.addEventListener("wheel", preventDefault, {
  //     passive: false,
  //   });
  // };
  // const preventDefault = (e) => {
  //   if (e.preventDefault) {
  //     e.preventDefault();
  //   }
  //   e.returnValue = false;
  // };

  const getNewsApi = process.env.REACT_APP_GET_NEWS;
  const [news, setNews] = useState(null);
  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const res = await axios.get(getNewsApi);
      setNews(res.data);
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
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <section>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {newsModal && newsModal.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {newsModal && <a>{newsModal.image}</a>}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {newsModal && newsModal.content}
            </Typography>
          </Box>
        </Modal>
        <div className="news-container" id="news-container">
          <div className="new-header">
            {news && news.length > 0 ? "Latest News" : ""}
          </div>
          <div
            className="sub-news-container"
            id="jump"
            onWheel={jump}
            ref={containerRef}
          >
            {news
              ? news.map((item) => {
                  return (
                    <div className="news-element" key={item._id}>
                      <div className="news-img">
                        <img src={logo} alt="icon" />
                      </div>
                      <div className="news-details">
                        <div className="admin-date">
                          <div className="admin">Admin</div>
                          <div className="date">
                            {new Date(item.date).getDate() +
                              " " +
                              monthNames[new Date(item.date).getMonth()] +
                              " " +
                              new Date(item.date).getFullYear()}
                          </div>
                        </div>
                        <div className="news-update" id="news-update">
                          <div className="news-headline">
                            <h5>{item.title}</h5>
                          </div>
                          <div className="news-info-brief">{item.content}</div>
                          <button
                            className="show-more"
                            onClick={() => {
                              handleOpen();
                              setNewsModal(item);
                            }}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <div className="news-element" key={index}>
                      <div className="news-img">
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                            height: "15rem",
                          }}
                        />
                      </div>
                      <div className="news-details">
                        <div className="admin-date">
                          <div className="admin">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "5rem" }}
                            />
                          </div>
                          <div className="date">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "5rem" }}
                            />
                          </div>
                        </div>
                        <div className="news-update" id="news-update">
                          <div className="news-headline">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray" }}
                            />
                          </div>
                          <div className="news-info-brief">
                            {" "}
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray" }}
                            />
                          </div>
                          <div>
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
}

// 656985158;
