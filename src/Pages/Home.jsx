import React from "react";
import Banner from "./Banner/Banner";
import Articles from "../Layouts/Articles/Articles";
import AgentCards from "../Layouts/AgentCard";
import LatestReviews from "../Layouts/LatestReviewCarousel";
import AdvertisedProperties from "./AdvertisedProperties";
import WhyChooseUs from "../Layouts/WhyChooseUs";
import OurPartners from "../Layouts/OurPartners";
import CounterSection from "../Layouts/CounterSection";
// import LatestReviews from "../Layouts/LatestReviewCarousel";
// import LatestReviewCarousel from "../Layouts/LatestReviewCarousel";

const Home = () => {
  return (
    <>
      <title>Home || Real estate</title>
      <div>
        <Banner></Banner>
        <CounterSection></CounterSection>

        <AdvertisedProperties></AdvertisedProperties>
        <AgentCards></AgentCards>

        {/* <LatestReviewCarousel></LatestReviewCarousel> */}
        <LatestReviews></LatestReviews>
        <div className="bg-gray-100">
          <Articles></Articles>
          <WhyChooseUs></WhyChooseUs>
        </div>
        <OurPartners></OurPartners>
      </div>
    </>
  );
};

export default Home;
