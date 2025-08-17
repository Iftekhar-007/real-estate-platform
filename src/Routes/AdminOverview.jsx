import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import AxiosSecure from "./AxiosSecure";

export default function AdminOverview() {
  const [data, setData] = useState([]);
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/dashboard/admin`).then((res) => {
      const stats = res.data;
      setData([
        { name: "Users", value: stats.totalUsers },
        { name: "Agents", value: stats.totalAgents },
        { name: "Admins", value: stats.totalAdmins },
        { name: "Sales", value: stats.totalSales },
      ]);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
