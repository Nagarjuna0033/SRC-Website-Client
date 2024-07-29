import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

import { useSelector } from "react-redux";
export default function DomainMembers() {
  const { domainName } = useParams();

  // env variable

  const getUserProfilesApi = process.env.REACT_APP_GET_ALL_USER_PROFILES;

  // domain id

  const domainId = useSelector((state) => state.domainData.domainId);

  // Hooks

  const [coordinators, setCoordinators] = useState(null);

  useEffect(() => {
    getUserProfiles();
  }, []);

  // Function to get User profiles

  const getUserProfiles = async () => {
    try {
      const res = await axios.get(getUserProfilesApi);
      setCoordinators(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  const getImageSrc = (image) => {
    if (image) {
      return isValidUrl(image) ? image : `data:image/jpeg;base64,${image}`; // Assuming binary data is base64 encoded
    }
  };
  // const extendedDetails = coordinators && [...coordinators, ...coordinators];

  return (
    <>
      <h3
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        Welcome to {domainName} Cell &lt;/&gt;
      </h3>
      <h3 className="team-heading">Our Team Members</h3>
      <div className="teamCarousel" id="teamCarousel">
        <div className="officail-container">
          {coordinators &&
            coordinators
              .filter((item) => item.domain === domainId)
              .map((item, index) => (
                <>
                  <div className="official-element">
                    <img
                      src={getImageSrc(item.image)}
                      alt=""
                      className="official-image"
                    />
                    <div className="official-details">
                      <span className="official-name">{item.name}</span>
                      <span className="official-mail">{item.email}</span>
                      <div className="media-links">
                        {item.linkedin && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={item.linkedin}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="linkedIn"
                            >
                              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                            </svg>
                          </a>
                        )}
                        {item.github && (
                          <a target="_blank" rel="noreferrer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 496 512"
                              className="github"
                              href={item.github}
                            >
                              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                            </svg>
                          </a>
                        )}
                        {item.leetcode && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={item.leetcode}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="leetcode"
                            >
                              <path
                                fill="currentColor"
                                d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"
                              />
                            </svg>
                          </a>
                        )}
                        {item.gfg && (
                          <a target="_blank" rel="noreferrer" href={item.gfg}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2em"
                              height="1.2em"
                              viewBox="0 0 24 24"
                              className="gfg"
                            >
                              <path
                                fill="currentColor"
                                d="M21.45 14.315c-.143.28-.334.532-.565.745a3.7 3.7 0 0 1-1.104.695a4.5 4.5 0 0 1-3.116-.016a3.8 3.8 0 0 1-2.135-2.078a4 4 0 0 1-.13-.353h7.418a4.3 4.3 0 0 1-.368 1.008zm-11.99-.654a3.8 3.8 0 0 1-2.134 2.078a4.5 4.5 0 0 1-3.117.016a3.7 3.7 0 0 1-1.104-.695a2.7 2.7 0 0 1-.564-.745a4.2 4.2 0 0 1-.368-1.006H9.59q-.056.18-.13.352m14.501-1.758a4 4 0 0 0-.082-.475l-9.634-.008a3.93 3.93 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357a6.3 6.3 0 0 0-2.544-.49a6.4 6.4 0 0 0-2.405.457a6 6 0 0 0-1.963 1.276a6.1 6.1 0 0 0-1.325 1.94a5.9 5.9 0 0 0-.466 1.864h-.063a5.9 5.9 0 0 0-.467-1.865a6.1 6.1 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.7 6.7 0 0 0-4.949.031A5.7 5.7 0 0 0 1.34 7.73l1.52 1.49a4.17 4.17 0 0 1 4.484-.958c.47.184.898.46 1.26.81c.368.36.66.792.859 1.268c.146.344.242.708.285 1.08l-9.635.008A4.7 4.7 0 0 0 0 12.457a6.5 6.5 0 0 0 .345 2.127a4.9 4.9 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.5 6.5 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a6 6 0 0 0 1.964-1.277a6.1 6.1 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077a6 6 0 0 0 1.964 1.276a6.4 6.4 0 0 0 2.405.457a6.5 6.5 0 0 0 2.502-.457a5.4 5.4 0 0 0 1.882-1.293a4.9 4.9 0 0 0 1.08-1.783A6.5 6.5 0 0 0 24 12.457a5 5 0 0 0-.039-.554"
                              />
                            </svg>
                          </a>
                        )}
                        {item.hackerrank && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={item.hackerrank}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2em"
                              height="1.2em"
                              viewBox="0 0 24 24"
                              className="hackerrank"
                            >
                              <path
                                fill="currentColor"
                                d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95a.11.11 0 0 1-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 0 1-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 0 1-.11.112h-5.78a.11.11 0 0 1-.11-.11v-7.77c0-.06.05-.11.11-.11z"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
        </div>
      </div>
    </>
  );
}
