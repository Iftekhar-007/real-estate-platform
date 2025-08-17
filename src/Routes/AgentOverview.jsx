import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useParams } from "react-router";
import AxiosSecure from "./AxiosSecure";

export default function AgentOverview() {
  const { email } = useParams();
  const [data, setData] = useState([]);
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/dashboard/agent/${email}`).then((res) => {
      const stats = res.data;
      setData([
        { name: "Added", value: stats.propertyCount },
        { name: "Sold", value: stats.soldCount },
        { name: "Offers", value: stats.offersCount },
      ]);
    });
  }, [email, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Agent Dashboard</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
