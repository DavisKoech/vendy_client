import { businessImages } from "../../DummyData";
import "./Intro.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  pauseOnHover: true,
  arrows: false, // Add this line to hide the navigation arrows
};

const Intro = () => {
  useEffect(() => {
    AOS.init({duration:2000})
   },[])


  return (
    <div className="intro">
      <div className="introContainer">
        <div className="introText">
          <h2 data-aos="fade-right" data-aos-duration="500">Every Other Business is on Board</h2>
          <h3 data-aos="fade-right" data-aos-duration="1000">What are you waiting for?</h3>
          <Link to="createStore"><button>Join Now</button></Link>
        </div>
        <div className="images">
          <Slider {...settings}>
            {businessImages.map((image) => (
              <img src={image.img} alt="" key={image.id} className="sliderImage" />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Intro;
