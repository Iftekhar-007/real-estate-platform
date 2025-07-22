// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { MdEmail } from "react-icons/md";
// import AxiosSecure from "../Routes/AxiosSecure";

// const AgentCards = () => {
//   const axiosSecure = AxiosSecure();

//   const { data: agents = [], isLoading } = useQuery({
//     queryKey: ["agents"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/agents");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <p className="text-center text-lg font-semibold">Loading agents...</p>
//     );
//   }

//   const topAgents = agents.slice(0, 3);

//   return (
//     <div>
//       <h2 className="font-philo lg:text-5xl font-bold text-center lg:my-20">
//         Certified Professionals
//       </h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {topAgents.map((agent) => (
//           <div
//             key={agent._id}
//             className="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center hover:shadow-2xl transition-all duration-300"
//           >
//             <img
//               src={agent.image}
//               alt={agent.name}
//               className="w-24 h-24 object-cover rounded-full mb-3 border-4 border-blue-500"
//             />
//             <h2 className="text-xl font-bold text-center">{agent.name}</h2>
//             <p className="text-gray-500 text-sm text-center">{agent.email}</p>

//             <a
//               href={`mailto:${agent.email}`}
//               className="mt-4 px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               <MdEmail className="text-xl" /> Contact Now
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AgentCards;

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
      <h2 className="font-philo lg:text-5xl font-bold text-center lg:my-20">
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
