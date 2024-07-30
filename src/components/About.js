import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import { Badge } from "@mui/material";
import "../styles/About.css";
import axios from "axios";
export default function About() {
  const getAllOfficialsApi = process.env.REACT_APP_GET_ALL_oFFICIALS;

  useEffect(() => {
    getAllOfficials();
  }, []);
  const [officials, setOfficials] = useState(null);

  const getAllOfficials = async () => {
    try {
      const res = await axios.get(getAllOfficialsApi);
      setOfficials(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <section className="about-us">
          <h1>About SRC (Student Recreation Center)</h1>
          <p>
            Welcome to the SRC (Student Recreation Center), a dynamic club
            initiated by the Computer Science department of RGUKT RK Valley in
            2024. Our mission is to foster increased interaction between seniors
            and juniors, promoting a culture of mutual learning, collaboration,
            and support within our college community.
          </p>
          <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
            Our Mission
          </h3>
          <p>
            Our Mission At SRC, we believe in the power of community and the
            importance of shared experiences. Our primary goal is to bridge the
            gap between different batches of students, enabling them to learn
            from each other, grow together, and create lasting bonds.
          </p>
          <p>
            <b>Regular Activities Weekly Coding Contests:</b> Every week, we
            organize coding contests that challenge our members to hone their
            programming skills. These contests are designed to be both fun and
            educational, providing a competitive yet friendly environment for
            all participants.
          </p>
          <p>
            <b>Share and Grow Sessions:</b> Held every Saturday, these sessions
            are a cornerstone of our club. Seniors share their valuable
            internship experiences, offer career advice, and discuss the latest
            trends in technology. We also invite knowledgeable speakers to share
            their professional journeys, providing diverse perspectives and
            insights.
          </p>
          <p>
            Community and Collaboration SRC is more than just a club; it’s a
            community. We pride ourselves on our inclusive and supportive
            environment, where every member is encouraged to participate,
            contribute, and grow. We believe that collaboration is key to
            success, and we strive to create opportunities for students to work
            together on projects, share knowledge, and support each other’s
            endeavors.
          </p>
          <p>
            Achievements Since our inception, SRC has made significant strides
            in fostering a vibrant community of learners and innovators. Our
            members have successfully participated in various coding
            competitions, hackathons, and have secured prestigious internships
            at leading companies. Our alumni network is growing, and their
            success stories continue to inspire and guide our current members.
          </p>
          <p>
            Future Goals Looking ahead, we aim to expand our activities and
            reach even more students. We plan to introduce new programs and
            initiatives, such as: Mentorship Programs: Pairing juniors with
            seniors for one-on-one guidance and support. Workshops and Seminars:
            Covering a wide range of topics from technical skills to soft skills
            development. Collaborations with Other Clubs: Partnering with other
            student clubs and organizations to host joint events and activities.
            Get Involved We invite all students to join SRC and be part of a
            thriving community dedicated to growth, learning, and collaboration.
            Whether you are a seasoned coder or just starting, there’s a place
            for you at SRC. Get involved, participate in our events, and take
            advantage of the numerous opportunities to learn, grow, and succeed.
          </p>
        </section>

        <section className="team">
          <h2>Our Team</h2>

          <div className="officail-container">
            {officials
              ? officials.map((ele) => {
                  return (
                    <div className="official-element">
                      <img
                        src={"data:image/jpeg;base64," + ele.photo}
                        alt=""
                        className="official-image"
                      />
                      <div className="official-details">
                        <span className="official-name">
                          {ele.name}
                          <sub>
                            {" "}
                            <span className="official-designation">
                              {ele.designation}
                            </span>
                          </sub>
                        </span>
                        <span className="offiacl-qualification">
                          {ele.qualifications}{" "}
                        </span>
                        <span className="officail-bio">{ele.bio}</span>
                        <span className="official-mail">{ele.email}</span>
                        <div className="media-links">
                          <a
                            href={ele.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="linkedIn"
                            >
                              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <div className="official-element">
                      <Skeleton
                        variant="circular"
                        height={150}
                        width={150}
                        sx={{
                          backgroundColor: "gray",
                        }}
                      />
                      <div
                        className="official-details"
                        style={{ placeItems: "center", gap: "0px" }}
                      >
                        <Skeleton
                          className="official-name"
                          variant="text"
                          width={"80%"}
                          height={"2rem"}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                            margin: "0px",
                          }}
                        />
                        <Skeleton
                          variant="text"
                          className="offiacl-qualification"
                          width={"80%"}
                          height={"2rem"}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                            margin: "0",
                          }}
                        />
                        <Skeleton
                          variant="rectangle"
                          width={"80%"}
                          height={"10rem"}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                          }}
                        />
                        <Skeleton
                          variant="text"
                          width={"80%"}
                          height={"2rem"}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "0.3rem",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
      </div>
    </>
  );
}
