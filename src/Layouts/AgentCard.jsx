import React from "react";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaEnvelope } from "react-icons/fa";
import AxiosSecure from "../Routes/AxiosSecure";

const AgentCards = () => {
  const axiosSecure = AxiosSecure();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-success"></span>;

  return (
    <div className="py-16 px-6">
      <h2 className="lg:text-4xl md:text-3xl text-xl text-center font-bold font-philo text-gray-800">
        Certified Professionals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:w-9/12 mx-auto py-8">
        {agents.slice(0, 3).map((agent) => (
          <div key={agent._id} className="card bg-base-100 shadow-sm p-4">
            <figure>
              <img
                src={agent.image}
                alt={agent.name}
                className="h-[420px] w-full"
              />
            </figure>
            <div className="card-body font-[poppins]">
              <h2 className="card-title text-xl text-gray-800 font-[poppins]">
                {agent.name}
              </h2>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope /> {agent.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentCards;
