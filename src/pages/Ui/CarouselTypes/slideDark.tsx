

import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img6 from "../../../assets/images/small/img-6.jpg"
import img4 from "../../../assets/images/small/img-4.jpg"
import img5 from "../../../assets/images/small/img-5.jpg"

const SlideDark = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        dark={true}
        interval={false}
        items={[
          {
            altText: " ",
            caption: "Drawing a sketch",
            key: 1,
            src: img6,
          },
          {
            altText: " ",
            caption: "Blue clock on a pastel background",
            key: 2,
            src: img4,
          },
          {
            altText: " ",
            caption: "Working at a coffee shop",
            key: 3,
            src: img5,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default SlideDark;
