import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/EventsDemo.css";
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";
import { Skeleton } from "@mui/material";
export default function EventsDemo() {
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
      <section>
        <div className="events-demo">
          <div className="events">
            <div className="event-head">{events && events.length > 0 ? "Upcoming Events" : ""}</div>
            {events
              ? events.map((element) => {
                  if (element.isUpcoming) {
                    return (
                      <div className="event-element" key={element._id}>
                        {element.images.length > 0 ? (
                          <div className="event-image">
                            <img
                              src={
                                "data:image/jpeg;base64," + element.images[0]
                              }
                              alt="icon"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="event-info">
                          <div className="date-month-year">
                            <div className="date">
                              {new Date(element.fromDate).getDate()}
                            </div>
                            <div className="month">
                              {monthNames[
                                new Date(element.fromDate).getMonth()
                              ] +
                                "-" +
                                new Date(element.fromDate).getFullYear()}
                            </div>
                          </div>
                          <div className="total-event-info">
                            <div className="event-name">
                              <Link to={`Events/${element.name}`}>
                                {element.name}
                              </Link>
                            </div>
                            <div className="time-venue">
                              {element.time} | {element.location}
                            </div>

                            <div className="event-desc">
                              {element.description}
                            </div>
                            <div>
                              <Link
                                to={{
                                  pathname: `Events/${element.name}`,
                                }}
                                state={{ eventId: element._id }}
                                className="know-more"
                              >
                                Know more
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div
                      className="event-element"
                      key={index}
                      style={{ width: "100%" }}
                    >
                      <div className="event-image">
                        <Skeleton
                          variant="rectangular"
                          height={"15rem"}
                          sx={{
                            backgroundColor: "gray",
                          }}
                        />
                      </div>
                      <div className="event-info">
                        <div className="date-month-year">
                          <div className="date">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "9rem" }}
                            />
                          </div>
                          <div className="month">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "9rem" }}
                            />
                          </div>
                        </div>
                        <div className="total-event-info">
                          <div className="event-name">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "15rem" }}
                            />
                          </div>
                          <div className="time-venue">
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "15rem" }}
                            />
                          </div>

                          <div className="event-desc">
                            {" "}
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "2  5rem" }}
                            />
                          </div>
                          <div>
                            <Skeleton
                              variant="text"
                              sx={{ backgroundColor: "gray", width: "15rem" }}
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
