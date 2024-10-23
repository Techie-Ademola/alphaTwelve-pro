import * as React from 'react';
import Slider from "react-slick";

function Fade() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
        <img src="" />
        </div>
        <div>
        <img src="" />
        </div>
        <div>
        <img src="" />
        </div>
        {/* <div>
          <img src={baseUrl + "/abstract04.jpg"} />
        </div> */}
      </Slider>
    </div>
  );
}

export default Fade;
