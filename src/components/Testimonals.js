import React, { useEffect, useState } from "react";
import "../styles/Testimonals.css";
import { Skeleton } from "@mui/material";
import axios from "axios";
export default function Testimonals() {
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );

  const [testimonials, setTestimonials] = useState(null);
  const getAllTestimonialsApi = process.env.REACT_APP_GET_ALL_TESTIMONIALS;
  useEffect(() => {
    getAllTestimonials();
  }, []);

  const getAllTestimonials = async () => {
    try {
      const res = await axios.get(getAllTestimonialsApi);
      setTestimonials(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  let [itemLength, setItemLength] = useState(0);

  const next = () => {
    setItemLength((prevItemLength) => {
      return testimonials && prevItemLength === testimonials.length - 1
        ? 0
        : testimonials && prevItemLength + 1;
    });
  };

  const prev = () => {
    setItemLength((prevItemLength) => {
      return testimonials && prevItemLength === 0
        ? testimonials && testimonials.length - 1
        : testimonials && prevItemLength - 1;
    });
  };

  return (
    <>
      <div className="testimonial-container">
        <div className="btn" id="btn-prev" onClick={prev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
        <div className="btn" id="btn-next" onClick={next}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
        {testimonials
          ? testimonials.map((item, index) => {
              if (index === itemLength) {
                return (
                  <>
                    <p className="testimonial">{item.message}</p>
                    <div className="user">
                      <img
                        src={"data:image/jpeg;base64," + item.photo}
                        alt="user"
                        className="user-image"
                      />
                      <div className="user-details">
                        <h4 className="username">{item.name}</h4>
                        <p className="role">{item.designation}</p>
                      </div>
                    </div>
                  </>
                );
              }
            })
          : Array.from({ length: 1 }).map((_, index) => {
              return (
                <>
                  <p className="testimonial">
                    <Skeleton
                      variant="text"
                      sx={{ backgroundColor: "gray", width: "9rem" }}
                    />
                  </p>
                  <div className="user">
                    <Skeleton
                      variant="circular"
                      width={"5rem"}
                      height={"5rem"}
                      sx={{
                        backgroundColor: "gray",
                      }}
                    />
                    <div className="user-details">
                      <h4 className="username">
                        <Skeleton
                          variant="text"
                          sx={{ backgroundColor: "gray", width: "9rem" }}
                        />
                      </h4>
                      <p className="role">
                        <Skeleton
                          variant="text"
                          sx={{ backgroundColor: "gray", width: "9rem" }}
                        />
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
      </div>
    </>
  );
}
