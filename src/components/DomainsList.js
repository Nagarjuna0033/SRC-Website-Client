import React, { useEffect, useState, useRef } from "react";
import app from "../assets/images/ui-ux.avif";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import axios from "axios";
export default function Domains() {
  // init of variables

  // useEffect for getting domains

  useEffect(() => {
    getDomains();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const disableScroll = () => {
      document.addEventListener("wheel", preventDefault, { passive: false });
    };

    const enableScroll = () => {
      document.removeEventListener("wheel", preventDefault, false);
    };

    if (container) {
      container.addEventListener("mouseenter", disableScroll);
      container.addEventListener("mouseleave", enableScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", disableScroll);
        container.removeEventListener("mouseleave", enableScroll);
      }
      enableScroll();
    };
  }, []);

  // Init of variables

  const getDomainsApi = process.env.REACT_APP_GET_DOMAINS;

  // init React hooks

  const [domains, setDomains] = useState(null);
  const containerRef = useRef(null);

  // Function for getting domains

  const getDomains = async () => {
    try {
      const res = await axios.get(getDomainsApi);
      setDomains(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Functions for cursor movement

  // Function for horizantal scroll of domains

  const move = (event) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY;
    }
  };

  // Function for enable scroll on background

  const enableScroll = () => {
    document.removeEventListener("wheel", preventDefault, false);
  };

  // Function for disable scroll

  const disableScroll = () => {
    document.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  };

  // Function for prevent default

  const preventDefault = (e) => {
    e.preventDefault();
    e.returnValue = false;
  };

  return (
    <>
      <div className="domain-container">
        <div
          className="domain-head"
          style={{
            fontSize: "1.9rem",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Domains
        </div>
        <div id="scroll" onWheel={move} ref={containerRef}>
          {domains
            ? domains.map((ele) => {
                return (
                  <Link
                    to={`Domain/${ele.name}`}
                    onClick={enableScroll}
                    key={ele._id}
                  >
                    <div className="domain-element">
                      <div className="domain-image">
                        <img src={ele.image && ele.image} alt="Domain" />
                      </div>
                      <div className="domain-name">
                        <h3>{ele.name}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })
            : Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Link key={index}>
                    <div className="domain-element">
                      <div className="domain-image">
                        <Skeleton
                          variant="rectangular"
                          width={"13rem"}
                          height={"13rem"}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                          }}
                        />
                      </div>
                      <div className="domain-name">
                        <h1>
                          <Skeleton
                            variant="text"
                            sx={{ backgroundColor: "gray" }}
                          />
                        </h1>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
}
