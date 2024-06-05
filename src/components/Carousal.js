import React from "react";
import carousalImg1 from "../assets/images/carousal-1.jpg";
import carousalImg2 from "../assets/images/carousal-2.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const images = [carousalImg1, carousalImg2,carousalImg1];
export default function Carousal() {

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
                    width="95%"
                >
                    {images.map((item) => {
                        return (
                            <div className="slide-holder"style={{background:`url(${item})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"50% 50%"}} >
                                <div className="text-container">
                                    <h2>Bugatti Chiron Super Sport 300</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.kjahflahfhf oiwwiro  asfh
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
                <div className="carousal-content">
                    <h2>Welcome to SRC</h2>
                    <h4>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Quasi reiciendis veritatis iure, aperiam vitae
                        obcaecati consequatur at. Praesentium, asperiores
                        facere ad repellendus voluptatibus consequatur nisi
                        commodi a? Incidunt odio magnam veritatis! Tempora
                        consectetur excepturi ipsam in! Nisi exercitationem,
                        vel autem ratione iusto fugiat esse labore! Enim
                        earum vel accusamus hic ipsum debitis aperiam
                        praesentium eos necessitatibus facilis laudantium
                        quasi odit, deserunt cumque quas quae exercitationem
                        soluta, cum doloremque id! Dignissimos animi, id
                        maxime autem provident quos consequatur rerum fugiat
                        qui repellendus quam aliquid sequi dolores sed
                        placeat ea distinctio quasi?......
                    </h4>
                </div>
            </center>
        </div>
    );
}
