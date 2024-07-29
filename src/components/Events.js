import React, { useEffect, useState } from "react";
import "../styles/Events.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";

export default function Events() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);
  const getEventsApi = process.env.REACT_APP_GET_EVENTS;

  const getEvents = async () => {
    try {
      const res = await axios.get(getEventsApi);
      setEvents(res.data);
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
  return (
    <>
      <div className="events-landing-img">
        <h1>Our Events</h1>
      </div>
      <div className="Event-list">
        {events
          ? events.map((event) => {
              return (
                <div className="event-container">
                  {event.images.length > 0 ? (
                    <div className="event-image">
                      <img
                        src={"data:image/jpeg;base64," + event.images[0]}
                        alt="icon"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="event-details">
                    <div className="event-date">
                      <h2>
                        {new Date(event.fromDate).getDate()} -{" "}
                        {new Date(event.toDate).getDate()}
                      </h2>
                      <h2>{monthNames[new Date(event.fromDate).getMonth()]}</h2>
                      <span> {new Date(event.fromDate).getFullYear()}</span>
                    </div>
                    <div className="event-venue-desc">
                      <div className="event-venue">
                        <h2>{event.name}</h2>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                          </svg>
                          {event.startTime}-{event.endTime}
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                          </svg>
                          {event.location}
                        </span>
                      </div>
                      <div className="event-description">
                        <div className="intro">
                          <p>{event.description}</p>
                        </div>
                        <Link
                          to={`/Events/${event.name}`}
                          state={{ eventId: event._id }}
                        >
                          <button>Get More</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : Array.from({ length: 5 }).map((_, index) => {
              return (
                <div
                  className="event-container"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="event-image">
                    <Skeleton
                      variant="rectangular"
                      width={"34rem"}
                      height={"21.9rem"}
                      sx={{
                        backgroundColor: "gray",
                        display:"inline-block"
                      }}
                    />
                  </div>
                  <div className="event-details">
                    <div className="event-date">
                      <h2>
                        <Skeleton
                          variant="rectangular"
                          width={"8rem"}
                          height={"4rem"}
                          sx={{
                            backgroundColor: "gray",
                            display:"inline-block"
                          }}
                        />
                      </h2>
                    </div>
                    <div className="event-venue-desc">
                      <div className="event-venue">
                        <h2>
                          <Skeleton
                            variant="text"
                            width={"10rem"}
                            height={"2rem"}
                            sx={{
                              backgroundColor: "gray",
                              display:"inline-block"
                            }}
                          />
                        </h2>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{marginTop:"1rem"}}
                          >
                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                          </svg>
                          <Skeleton
                            variant="text"
                            width={"14rem"}
                            height={"2rem"}
                            sx={{
                              backgroundColor: "gray",
                              display:"inline-block",
                               
                            }}
                          />
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                          </svg>
                          <Skeleton
                            variant="text"
                            width={"8rem"}
                            height={"2rem"}
                            sx={{
                              // marginTop:"-4rem",
                              backgroundColor: "gray",
                              display:"inline-block"
                            }}
                          />
                        </span>
                      </div>
                      <div className="event-description">
                        <div className="intro">
                          <p>
                            <Skeleton
                              variant="text"
                              width={"16rem"}
                              height={"8rem"}
                              sx={{
                                backgroundColor: "gray",
                                display:"inline-block", 
                                margin:"0px"
                             }}
                            />
                          </p>
                        </div>

                          <Skeleton
                            variant="text"
                            width={"6rem"}
                            height={"2rem"}
                            sx={{
                              backgroundColor: "gray",
                            }}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}
