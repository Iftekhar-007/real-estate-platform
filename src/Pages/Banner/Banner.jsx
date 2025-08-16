// Banner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://i.ibb.co/HLDKj22D/dillon-kydd-2ke-CPb73a-QY-unsplash.jpg",
    heading: "Find Your Dream Home",
    subtext:
      "Explore thousands of verified listings. Your perfect match awaits.",
  },
  {
    image: "https://i.ibb.co/zhHChLQX/2149661456.jpg",
    heading: "Trusted Agents. Smart Choices.",
    subtext: "Work with professionals who care about your journey.",
  },
  {
    image:
      "https://i.ibb.co/MycHmz08/francesca-tosolini-t-Hk-JAMc-O3-QE-unsplash.jpg",
    heading: "One Platform. Endless Possibilities.",
    subtext: "Buy, rent or sell with confidence. All in one place.",
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[800px] md:h-[700px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 md:p-12 rounded-xl text-center text-white max-w-2xl mx-auto shadow-lg">
                <h2 className="text-3xl font-philo md:text-5xl font-bold mb-4">
                  {slide.heading}
                </h2>
                <p className="text-base font-philo md:text-xl mb-6">
                  {slide.subtext}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
