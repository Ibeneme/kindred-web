import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FolderTree,
  Search,
  Trash2,
  ShieldAlert,

  Eye,
  X,
  BarChart3,
  Users,
  CreditCard,
  Loader2,
  Menu,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch, RootState } from "../redux/store";
import {
  fetchAllFamilies,
  fetchFamilyDeepDive,
  toggleFamilySuspension,
  deleteFamilyPermanently,
  clearActiveFamily,
} from "../redux/slices/adminFamilySlice";
import Sidebar from "./Sidebar";

const FamilyManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { families, activeFamilyDetails, loading, } = useSelector(
    (state: RootState) => state.adminFamily
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    type: "delete" | "suspend" | "activate" | null;
    familyId: string | null;
    familyName: string | null;
  }>({ show: false, type: null, familyId: null, familyName: null });

  useEffect(() => {
    dispatch(fetchAllFamilies());
  }, [dispatch]);

  const filteredFamilies = families.filter((f) =>
    f.familyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openConfirm = (
    id: string,
    name: string,
    type: "delete" | "suspend" | "activate"
  ) => {
    setConfirmModal({ show: true, type, familyId: id, familyName: name });
  };

  const handleConfirmedAction = async () => {
    if (!confirmModal.familyId) return;
    if (confirmModal.type === "delete") {
      await dispatch(deleteFamilyPermanently(confirmModal.familyId));
    } else {
      await dispatch(toggleFamilySuspension(confirmModal.familyId));
    }
    setConfirmModal({
      show: false,
      type: null,
      familyId: null,
      familyName: null,
    });
  };

  if (loading && families.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#0B0A0F] font-sans relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {confirmModal.show && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal({ ...confirmModal, show: false })}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl text-center"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
                  confirmModal.type === "delete"
                    ? "bg-red-50 text-red-500"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {confirmModal.type === "delete" ? (
                  <Trash2 size={32} />
                ) : (
                  <AlertTriangle size={32} />
                )}
              </div>
              <h3 className="text-lg md:text-xl font-black uppercase mb-2">
                Confirm {confirmModal.type}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm mb-8 px-2">
                Are you sure about{" "}
                <span className="text-black font-bold">
                  {confirmModal.familyName}
                </span>
                ?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmedAction}
                  className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest ${
                    confirmModal.type === "delete"
                      ? "bg-red-500 text-white"
                      : "bg-black text-white"
                  }`}
                >
                  Confirm
                </button>
                <button
                  onClick={() =>
                    setConfirmModal({ ...confirmModal, show: false })
                  }
                  className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-64 w-full p-4 md:p-8 lg:p-10">
        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <FolderTree size={20} className="text-yellow-500" />
            <span className="font-black uppercase tracking-tighter text-sm">
              Families
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-50 rounded-xl"
          >
            <Menu size={24} />
          </button>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Family Hubs
            </h1>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">
              Platform-wide Network Audit
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search families..."
              className="bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-6 w-full text-sm font-medium shadow-sm focus:border-yellow-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* --- TABLE CONTENT --- */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-6 py-5 text-center">Type</th>
                  <th className="px-6 py-5">Family Name</th>
                  <th className="px-6 py-5">Owner</th>
                  <th className="px-4 py-5 text-center">Members</th>
                  <th className="px-4 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                {filteredFamilies.map((f) => (
                  <tr key={f._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-5 text-center">
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-[9px] font-black uppercase">
                        {f.familyType}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black uppercase tracking-tight truncate max-w-[200px]">
                      {f.familyName}
                    </td>
                    <td className="px-6 py-5 font-bold text-gray-500 whitespace-nowrap">
                      {f.owner?.firstName} {f.owner?.lastName}
                    </td>
                    <td className="px-4 py-5 text-center font-black">
                      {f.members?.length || 0}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                          f.status === "active"
                            ? "bg-green-50 text-green-600 border-green-100"
                            : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => dispatch(fetchFamilyDeepDive(f._id))}
                          className="p-2 bg-gray-50 text-gray-400 hover:text-black rounded-xl"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            openConfirm(
                              f._id,
                              f.familyName,
                              f.status === "active" ? "suspend" : "activate"
                            )
                          }
                          className={`p-2 rounded-xl ${
                            f.status === "active"
                              ? "bg-gray-50 text-gray-400"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          <ShieldAlert size={18} />
                        </button>
                        <button
                          onClick={() =>
                            openConfirm(f._id, f.familyName, "delete")
                          }
                          className="p-2 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- DEEP DIVE MODAL --- */}
        <AnimatePresence>
          {activeFamilyDetails && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-6 lg:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => dispatch(clearActiveFamily())}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
              >
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-[#F8F9FA]">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                      {activeFamilyDetails.familyInfo.familyName}
                    </h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                      Audit Details
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(clearActiveFamily())}
                    className="p-3 bg-white rounded-xl shadow-sm"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <AssetBadge
                      label="Tasks"
                      value={activeFamilyDetails.assets.countSummary.tasks}
                      icon={<BarChart3 size={16} />}
                      color="blue"
                    />
                    <AssetBadge
                      label="Polls"
                      value={activeFamilyDetails.assets.countSummary.polls}
                      icon={<Users size={16} />}
                      color="yellow"
                    />
                    <AssetBadge
                      label="Stories"
                      value={activeFamilyDetails.assets.countSummary.content}
                      icon={<Eye size={16} />}
                      color="purple"
                    />
                    <AssetBadge
                      label="Campaigns"
                      value={activeFamilyDetails.assets.countSummary.campaigns}
                      icon={<CreditCard size={16} />}
                      color="green"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AssetSection
                      title="Content Repository"
                      items={activeFamilyDetails.assets.content}
                    />
                    <AssetSection
                      title="Financial Ledger"
                      items={activeFamilyDetails.assets.campaigns}
                    />
                    <AssetSection
                      title="Safety & Reports"
                      items={activeFamilyDetails.assets.reports}
                    />
                    <AssetSection
                      title="System Protocols"
                      items={activeFamilyDetails.assets.safetyNets}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const AssetBadge = ({ label, value, icon, color }: any) => (
  <div
    className={`p-4 md:p-6 bg-${color}-50 border border-${color}-100 rounded-3xl md:rounded-[2.5rem] flex flex-col gap-1 md:gap-2`}
  >
    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-xs shadow-sm">
      {icon}
    </div>
    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
      {label}
    </p>
    <p className="text-xl md:text-2xl font-black">{value || 0}</p>
  </div>
);

const AssetSection = ({ title, items }: { title: string; items: any[] }) => (
  <div className="bg-[#F8F9FA] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-6 border border-gray-100">
    <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">
      {title}
    </h4>
    <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-hide">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-3 rounded-xl border border-gray-50 shadow-sm flex justify-between items-center"
          >
            <p className="text-[10px] md:text-xs font-black uppercase truncate pr-2">
              {item.title || item.contentType || "Asset"}
            </p>
            <p className="text-[9px] text-gray-300 font-bold whitespace-nowrap">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-[9px] font-bold text-gray-300 italic">No assets</p>
      )}
    </div>
  </div>
);

export default FamilyManagement;
