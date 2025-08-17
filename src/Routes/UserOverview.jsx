import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

export default function UserDashboard({ email }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/dashboard/user/${email}`).then((res) => {
      const stats = res.data;
      setData([
        { name: "Reviews", value: stats.reviewCount },
        { name: "Wishlist", value: stats.wishlistCount },
        { name: "Offers", value: stats.offersCount },
        { name: "Bought", value: stats.boughtCount },
      ]);
    });
  }, [email]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
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
