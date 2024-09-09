import { categories } from "../../DummyData"
import "./Categories.scss"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const visibleSlides = 6;


const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: visibleSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    cssEase: "linear",
    pauseOnHover: true
};

const Categories = () => {






  return (
    <div className='categories'>
         <Slider {...settings}>
        {categories.map((category) => (
          <div className="category" key={category.id}>
            <h3>{category.name}</h3>
            {/* Include other category details like images here */}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Categories