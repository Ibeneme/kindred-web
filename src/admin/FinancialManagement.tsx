import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Menu,
  TrendingUp,
  DollarSign,
  X,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch, RootState } from "../redux/store";
import {
  fetchAllCampaigns,
  fetchCampaignContributions,
  verifyContribution,
} from "../redux/slices/adminFinanceSlice";
import Sidebar from "./Sidebar";

const FinancialManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, contributions, loading, actionLoading } = useSelector(
    (state: RootState) => state.adminFinance
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [proofModal, setProofModal] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCampaigns());
  }, [dispatch]);

  const handleViewContributions = (campaign: any) => {
    setSelectedCampaign(campaign);
    dispatch(fetchCampaignContributions(campaign._id));
  };

  const totalPlatformRaised = campaigns.reduce(
    (acc, curr) => acc + curr.totalRaised,
    0
  );

  // 1. Initial Full Page Loader
  if (loading && campaigns.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Syncing Financial Ledger...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#0B0A0F] font-sans relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-10 transition-all">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <CreditCard size={18} className="text-black" />
            </div>
            <span className="font-black uppercase tracking-tighter text-sm">
              Financials
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-50 rounded-xl"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Global Finance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <FinanceStat
            label="Total Volume"
            value={totalPlatformRaised}
            icon={<DollarSign size={20} />}
            color="yellow"
          />
          <FinanceStat
            label="Active Campaigns"
            value={campaigns.length}
            icon={<TrendingUp size={20} />}
            color="blue"
          />
          <FinanceStat
            label="Pending Audits"
            value={
              contributions.filter((c) => c.verificationStatus === "PENDING")
                .length
            }
            icon={<Clock size={20} />}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* CAMPAIGN LIST */}
          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" /> Active Platform
              Campaigns
            </h3>
            <div className="space-y-4">
              {campaigns.map((camp) => {
                const progress = Math.min(
                  (camp.totalRaised / camp.targetAmount) * 100,
                  100
                );
                return (
                  <div
                    key={camp._id}
                    onClick={() => handleViewContributions(camp)}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
                      selectedCampaign?._id === camp._id
                        ? "border-yellow-500 bg-yellow-50/30"
                        : "border-gray-50 bg-[#F8F9FA] hover:border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] text-yellow-600 font-black uppercase tracking-widest">
                          {camp.family?.familyName}
                        </p>
                        <h4 className="font-black text-sm uppercase">
                          {camp.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-black px-2 py-1 bg-white rounded-lg border border-gray-100">
                        {camp.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>
                          Raised: ₦{camp.totalRaised.toLocaleString()}
                        </span>
                        <span>Goal: ₦{camp.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CONTRIBUTION AUDIT TABLE */}
          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col min-h-[400px]">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" /> Contribution
              Audit Log
            </h3>

            {!selectedCampaign ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <CreditCard size={48} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Select a campaign to audit payments
                </p>
              </div>
            ) : loading ? (
              // 2. Inline Loading for Contributions
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Retrieving Records...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                      <th className="pb-4">Contributor</th>
                      <th className="pb-4 text-center">Amount</th>
                      <th className="pb-4 text-center">Proof</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {contributions.map((con) => (
                      <tr key={con._id} className="text-xs">
                        <td className="py-4">
                          <p className="font-black uppercase truncate">
                            {con.contributor?.firstName}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            Verified Member
                          </p>
                        </td>
                        <td className="py-4 text-center font-black">
                          ₦{con.amountSent.toLocaleString()}
                        </td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => setProofModal(con.paymentProof.url)}
                            className="p-2 bg-gray-50 text-gray-400 hover:text-yellow-600 rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                        <td className="py-4 text-right">
                          {con.verificationStatus === "PENDING" ? (
                            <div className="flex justify-end gap-1">
                              <button
                                disabled={actionLoading}
                                onClick={() =>
                                  dispatch(
                                    verifyContribution({
                                      id: con._id,
                                      status: "VERIFIED",
                                    })
                                  )
                                }
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                disabled={actionLoading}
                                onClick={() =>
                                  dispatch(
                                    verifyContribution({
                                      id: con._id,
                                      status: "REJECTED",
                                    })
                                  )
                                }
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                              >
                                <XCircle size={14} />
                              </button>
                            </div>
                          ) : (
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                                con.verificationStatus === "VERIFIED"
                                  ? "bg-green-50 text-green-600 border border-green-100"
                                  : "bg-red-50 text-red-600 border border-red-100"
                              }`}
                            >
                              {con.verificationStatus}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Proof Modal */}
      <AnimatePresence>
        {proofModal && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
            onClick={() => setProofModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white rounded-[2rem] overflow-hidden"
            >
              <img
                src={proofModal}
                alt="Payment Proof"
                className="w-full h-auto max-h-[80vh] object-contain p-2"
              />
              <button
                className="absolute top-4 right-4 p-4 bg-white/20 hover:bg-white text-black rounded-full backdrop-blur-md transition-all"
                onClick={() => setProofModal(null)}
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FinanceStat = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${color}-50 text-${color}-600`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className="text-3xl font-black">
        {typeof value === "number" && label.includes("Volume")
          ? `₦${value.toLocaleString()}`
          : value}
      </p>
    </div>
  </div>
);

export default FinancialManagement;
