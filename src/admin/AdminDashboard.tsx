import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart as PieIcon,
  Loader2,
  Globe,
  BarChart3,
  Menu,
  FolderTree,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchDashboardStats } from "../redux/slices/dashboardSlice";
import Sidebar from "./Sidebar";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { stats, loading } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Data for Bar Chart (shortened names)
  const contentChartData = stats
    ? Object.entries(stats.content).map(([name, value]) => ({
        name: name.split(" ")[0],
        count: value,
      }))
    : [];

  // Data for Pie Chart
  const featureData = stats
    ? [
        { name: "News", value: stats.features.news },
        { name: "Reports", value: stats.features.reports },
        { name: "Safety", value: stats.features.safetyNets },
        { name: "Polls", value: stats.features.activePolls },
      ]
    : [];

  const COLORS = ["#EAB308", "#3B82F6", "#EF4444", "#8B5CF6"];

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="animate-spin text-yellow-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#0B0A0F] font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 lg:ml-64 p-6 lg:p-10 transition-all">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-black uppercase tracking-tighter">
            Kindred Admin
          </span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">
              Master Control
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mt-2">
              <Globe size={14} className="text-yellow-500" /> Administrative
              Intelligence
            </p>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Total Users"
            value={stats?.overview.totalUsers}
            trend="Global"
            color="blue"
          />
          <StatCard
            label="Total Families"
            value={stats?.overview.totalFamilies}
            trend="Networks"
            color="yellow"
          />
          <StatCard
            label="Activity Score"
            value={stats?.overview.platformActivityScore}
            trend="Pulse"
            color="green"
          />
          <StatCard
            label="Active Polls"
            value={stats?.features.activePolls}
            trend="Voting"
            color="purple"
          />
        </div>

        {/* --- CONTENT REPOSITORY CARDS --- */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
            <FolderTree size={16} className="text-yellow-500" /> Content
            Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats &&
              Object.entries(stats.content).map(([key, value]) => (
                <ContentCard key={key} label={key} value={value as number} />
              ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <BarChart3 size={16} className="text-yellow-500" /> Distribution
                Matrix
              </h3>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F8F9FA"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#FDFDFD" }}
                    contentStyle={{ borderRadius: "12px", border: "none" }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#EAB308"
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <PieIcon size={16} className="text-blue-500" /> System Features
            </h3>
            <div className="flex-1 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featureData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {featureData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Finance and Extra Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-black rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-8">
                Asset Management
              </h3>
              <p className="text-5xl font-black mb-1">
                {stats?.finance.contributions}
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Global Contributions
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Active Campaigns
              </span>
              <span className="text-xl font-black text-yellow-500">
                {stats?.finance.campaigns}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MiniStat
                label="Global Reports"
                value={stats?.features.reports}
                color="red"
              />
              <MiniStat
                label="News Items"
                value={stats?.features.news}
                color="blue"
              />
              <MiniStat
                label="Safety Nets"
                value={stats?.features.safetyNets}
                color="purple"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black">{value || 0}</span>
      <span
        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-${color}-50 text-${color}-600 border border-${color}-100`}
      >
        {trend}
      </span>
    </div>
  </div>
);

const ContentCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-yellow-500/50 transition-all group cursor-default">
    <div className="flex justify-between items-start mb-2">
      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest group-hover:text-yellow-600 transition-colors">
        {label}
      </p>
      <ArrowUpRight
        size={12}
        className="text-gray-300 group-hover:text-yellow-500"
      />
    </div>
    <p className="text-2xl font-black text-[#0B0A0F]">{value}</p>
  </div>
);

const MiniStat = ({ label, value, color }: any) => (
  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className={`text-xl font-black text-${color}-600`}>{value || 0}</p>
  </div>
);

export default AdminDashboard;
