import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import Articles from "../Layouts/Articles/Articles";

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

        <Articles></Articles>
      </div>
    </>
  );
};

export default Home;
