import React from "react";
import carousalImg1 from "../assets/images/carousal-1.jpg";
import carousalImg2 from "../assets/images/carousal-2.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const images = [carousalImg1, carousalImg2, carousalImg1];
export default function Eventcarousal() {
  return (
    <div>
      <center>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          showArrows={true}
          useKeyboardArrows={true}
          autoPlay={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          {images.map((item, i) => {
            return (
              <div
                className="event-slide-holder"
                style={{
                  background: `url(${item})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                }}
                key={i}
              >
                <div className="event-text-container">
                  <h2>Bugatti Chiron Super Sport 300</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua se. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.kjahflahfhf oiwwiro asfh
                  </p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </center>
    </div>
  );
}
