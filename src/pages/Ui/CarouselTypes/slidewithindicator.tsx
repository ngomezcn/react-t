import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img3 from "../../../assets/images/small/img-3.jpg"
import img4 from "../../../assets/images/small/img-4.jpg"
import img5 from "../../../assets/images/small/image_t.png"
//import img5 from "../../../assets/images/small/img-5.jpg"


const Slidewithindicator = () => {
  return (
    <React.Fragment>
      <div >
        <UncontrolledCarousel
          interval={4000}
          items={[
            {
              altText: " ",
              caption: " ",
              key: 1,
              src: img3,
            },
            {
              altText: " ",
              caption: " ",
              key: 2,
              src: img4,
            },
            {
              altText: " ",
              caption: " ",
              key: 3,
              src: img5,
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default Slidewithindicator;

