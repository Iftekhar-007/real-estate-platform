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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="font-philo lg:text-5xl font-bold text-center lg:my-20 text-gray-800">
        Certified Professionals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:w-8/12 mx-auto">
        {agents.slice(0, 3).map((agent) => (
          <div key={agent._id} className="card bg-base-100 shadow-sm">
            <figure>
              <img
                src={agent.image}
                alt={agent.name}
                className="h-[420px] w-full object-fit"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{agent.name}</h2>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope /> {agent.email}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Contact Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentCards;
