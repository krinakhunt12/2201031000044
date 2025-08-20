import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  BarChart2,
  PieChart,
  MoreVertical,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

const Overview = ({ stats, orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
  <div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl shadow-xl border border-gray-100">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 flex items-center mt-2">
            <Calendar className="w-4 h-4 mr-1.5" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100">
          View analytics <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          trend={`+${stats.newUsers} this week`}
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          trend="5 categories"
          icon={<Package className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          trend={`${stats.conversionRate} conversion`}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="violet"
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          trend={`₹${stats.avgOrderValue} avg order`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Charts Section */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-lg lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Sales Overview</h3>
              <p className="text-sm text-gray-500">Last 12 months performance</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Week</button>
              <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Month</button>
              <button className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow">Year</button>
            </div>
          </div>
          <div className="h-72 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
            <BarChart2 className="w-12 h-12 text-gray-300" />
          </div>
        </div>

  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Sources</h3>
              <p className="text-sm text-gray-500">By product categories</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-72 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
            <PieChart className="w-12 h-12 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-lg">
  <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">Latest transactions</p>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            View all <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>
  <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
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

const StatCard = ({ title, value, trend, icon, color }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      value: "text-blue-900",
      border: "border-blue-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      value: "text-emerald-900",
      border: "border-emerald-100",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      value: "text-violet-900",
      border: "border-violet-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      value: "text-amber-900",
      border: "border-amber-100",
    },
  };

  return (
    <div
      className={`${colorClasses[color].bg} p-5 rounded-xl border ${colorClasses[color].border} shadow-xs`}
    >
      <div className="flex justify-between">
        <div>
          <p className={`text-sm font-medium ${colorClasses[color].text}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold mt-1 ${colorClasses[color].value}`}>
            {value}
          </p>
          <p className={`text-xs mt-2 ${colorClasses[color].text}`}>{trend}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-lg ${colorClasses[color].bg} flex items-center justify-center`}
        >
          {React.cloneElement(icon, { className: `w-5 h-5 ${colorClasses[color].text}` })}
        </div>
      </div>
    </div>
  );
};

export default Overview;