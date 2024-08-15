import Slider from "react-slick"
import Img1 from "../assets/images/1.jpg"
import Img2 from "../assets/images/2.jpg"
import Img3 from "../assets/images/3.jpg"
import Img4 from "../assets/images/4.jpg"

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    // fade: true,
    autoplaySpeed: 2000,
  }
  return (
    <>
      <div>
        <Slider {...settings}>
          <div className="w-full h-[500px] flex items-center justify-center">
            <img
              src={Img1}
              className="w-full h-auto object-contain"
              alt="img"
            />
          </div>

          <div className="w-full h-[500px] flex items-center justify-center">
            <img
              src={Img2}
              className="w-full h-auto object-contain"
              alt={"img"}
            />
          </div>
          <div className="w-full h-[500px] flex items-center justify-center">
            <img
              src={Img3}
              className="w-full h-auto object-contain"
              alt={"img"}
            />
          </div>
          <div className="w-full h-[500px] flex items-center justify-center">
            <img
              src={Img4}
              className="w-full h-auto object-contain"
              alt={"img"}
            />
          </div>
        </Slider>
      </div>
    </>
  )
}

export default SliderComponent
