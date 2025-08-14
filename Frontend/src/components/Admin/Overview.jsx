import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  BarChart2,
  PieChart,
  MoreVertical
} from "lucide-react";

const Overview = ({ stats, orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subText={`+${stats.newUsers} this week`}
          icon={<Users className="w-8 h-8 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subText="5 categories"
          icon={<Package className="w-8 h-8 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          subText={`${stats.conversionRate} conversion`}
          icon={<ShoppingCart className="w-8 h-8 text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          subText={`₹${stats.avgOrderValue} avg order`}
          icon={<TrendingUp className="w-8 h-8 text-orange-600" />}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Sales Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-gray-100 rounded-md">Week</button>
              <button className="px-3 py-1 text-xs bg-gray-100 rounded-md">Month</button>
              <button className="px-3 py-1 text-xs bg-black text-white rounded-md">Year</button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <BarChart2 className="w-12 h-12 text-gray-300" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Revenue Sources</h3>
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <PieChart className="w-12 h-12 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Recent Orders</h3>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subText, icon, color }) => {
  return (
    <div
      className={`bg-${color}-50 p-6 rounded-lg border border-${color}-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium text-${color}-600`}>{title}</p>
          <p className={`text-2xl font-bold text-${color}-900`}>{value}</p>
          <p className={`text-xs text-${color}-600 mt-1`}>{subText}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default Overview;
