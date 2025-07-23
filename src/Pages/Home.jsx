import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import Articles from "../Layouts/Articles/Articles";
import AgentCards from "../Layouts/AgentCard";
import LatestReviews from "../Layouts/LatestReviewCarousel";
import AdvertisedProperties from "./AdvertisedProperties";
// import LatestReviews from "../Layouts/LatestReviewCarousel";
// import LatestReviewCarousel from "../Layouts/LatestReviewCarousel";

const Home = () => {
  useEffect(() => {
    document.title = "ZapEstate | Home";

    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = "../../public/real-estate.png";
    }
  }, []);

  return (
    <>
      <title>Home || Real estate</title>
      <div>
        <Banner></Banner>
        <AdvertisedProperties></AdvertisedProperties>
        <AgentCards></AgentCards>
        {/* <LatestReviewCarousel></LatestReviewCarousel> */}
        <LatestReviews></LatestReviews>
        <Articles></Articles>
      </div>
    </>
  );
};

export default Home;
