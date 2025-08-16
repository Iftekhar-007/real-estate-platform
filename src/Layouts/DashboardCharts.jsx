import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ role }) => {
  // ===== Static Data =====
  const userData = [
    { name: "Offered", value: 5 },
    { name: "Bought", value: 2 },
  ];

  const agentData = [
    { name: "Added Properties", value: 10 },
    { name: "Sold Properties", value: 4 },
    { name: "Offers Received", value: 12 },
  ];

  const adminData = [
    { name: "Users", value: 100 },
    { name: "Agents", value: 15 },
    { name: "Properties", value: 80 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // ===== Role-based Rendering =====
  if (role === "user") {
    return (
      <div style={{ padding: "20px" }}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={userData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (role === "agent") {
    return (
      <div style={{ padding: "20px" }}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={agentData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div style={{ padding: "20px" }}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={adminData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {adminData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return <p>Invalid role</p>;
  }
};

export default DashboardCharts;
