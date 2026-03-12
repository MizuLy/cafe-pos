import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiDrinksLine } from "react-icons/ri";
import { IoCashOutline, IoBagCheckOutline } from "react-icons/io5";
import axios from "axios";
import StatCard from "../components/StatCard";
import DrinkPieChart from "../components/DrinkPieChart";
import RevenueBarChart from "../components/RevenueBarChart";

export default function Dashboard() {
  const APIOrder = `http://localhost:8880/api/order`;
  const APIDrink = `http://localhost:8880/api/drink`;
  const [drink, setDrink] = useState([]);
  const [order, setOrder] = useState([]);

  const totalOrder = order.length;
  const totalDrinksOrdered = order.reduce((sum, o) => sum + o.quantity, 0);
  const totalRevenue = order.reduce(
    (sum, o) => sum + parseFloat(o.total_price),
    0,
  );

  // Fetch API from Order
  const getOrder = async () => {
    try {
      const res = await axios.get(APIOrder);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch API from Drink
  const getDrink = async () => {
    try {
      const res = await axios.get(APIDrink);
      setDrink(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare data for Pie Chart
  const drinkOrderCounts = order.reduce((acc, o) => {
    acc[o.item_name] = (acc[o.item_name] || 0) + o.quantity;
    return acc;
  }, {});

  const pieData = Object.entries(drinkOrderCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare data for Bar Chart
  const drinkRevenue = order.reduce((acc, o) => {
    acc[o.item_name] = (acc[o.item_name] || 0) + parseFloat(o.total_price);
    return acc;
  }, {});

  const barData = Object.entries(drinkRevenue).map(([name, revenue]) => ({
    name,
    revenue: parseFloat(revenue.toFixed(2)),
  }));

  useEffect(() => {
    getOrder();
    getDrink();
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-medium flex gap-2">
        <LuLayoutDashboard /> Overview
      </h1>
      <p className="text-xl mt-2">This is where admin can view all the data</p>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrder}
          icon={RiDrinksLine}
          borderColor="border-orange-500"
        />

        <StatCard
          title="Drinks Ordered"
          value={totalDrinksOrdered}
          icon={IoBagCheckOutline}
          borderColor="border-blue-500"
        />

        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={IoCashOutline}
          borderColor="border-green-500"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DrinkPieChart data={pieData} />
        <RevenueBarChart data={barData} />
      </div>
    </div>
  );
}
