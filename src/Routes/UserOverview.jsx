import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useParams } from "react-router";
import AxiosSecure from "./AxiosSecure";

export default function UserOverview() {
  const { email } = useParams(); // ✅ path theke email pabe
  const [data, setData] = useState([]);
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    if (email) {
      axiosSecure.get(`/dashboard/user/${email}`).then((res) => {
        const stats = res.data;
        setData([
          { name: "Reviews", value: stats.reviewCount },
          { name: "Wishlist", value: stats.wishlistCount },
          { name: "Offers", value: stats.offersCount },
          { name: "Bought", value: stats.boughtCount },
        ]);
      });
    }
  }, [email, axiosSecure]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Overview</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
