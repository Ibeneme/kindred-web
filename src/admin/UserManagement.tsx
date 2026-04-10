import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  Search,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Menu,
  AlertTriangle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch, RootState } from "../redux/store";
import {
  fetchAllUsers,
  toggleUserSuspension,
  deleteUserAccount,
} from "../redux/slices/adminUserSlice";
import Sidebar from "./Sidebar";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, actionLoading } = useSelector(
    (state: RootState) => state.adminUser
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    type: "delete" | "suspend" | "activate" | null;
    userId: string | null;
    userName: string | null;
  }>({ show: false, type: null, userId: null, userName: null });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openConfirm = (
    id: string,
    name: string,
    type: "delete" | "suspend" | "activate"
  ) => {
    setConfirmModal({ show: true, type, userId: id, userName: name });
  };

  const handleConfirmedAction = async () => {
    if (!confirmModal.userId) return;

    if (confirmModal.type === "delete") {
      await dispatch(deleteUserAccount(confirmModal.userId));
    } else {
      await dispatch(toggleUserSuspension(confirmModal.userId));
    }
    setConfirmModal({ show: false, type: null, userId: null, userName: null });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#0B0A0F] font-sans relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {confirmModal.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal({ ...confirmModal, show: false })}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 text-center"
            >
              <button
                onClick={() =>
                  setConfirmModal({ ...confirmModal, show: false })
                }
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
                  confirmModal.type === "delete"
                    ? "bg-red-50 text-red-500"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {confirmModal.type === "delete" ? (
                  <Trash2 size={36} />
                ) : (
                  <AlertTriangle size={36} />
                )}
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                Confirm {confirmModal.type}
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-8 px-4">
                Are you sure you want to {confirmModal.type}{" "}
                <span className="text-black font-bold">
                  {confirmModal.userName}
                </span>
                ?
                {confirmModal.type === "delete" && " This action is permanent."}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmedAction}
                  disabled={actionLoading}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                    confirmModal.type === "delete"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {actionLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    `Yes, ${confirmModal.type}`
                  )}
                </button>
                <button
                  onClick={() =>
                    setConfirmModal({ ...confirmModal, show: false })
                  }
                  className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:ml-64 p-4 md:p-6 lg:p-10 transition-all duration-300">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-black" />
            </div>
            <span className="font-black uppercase tracking-tighter text-sm">
              Users
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Header */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              User Directory
            </h1>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">
              Managing {users.length} Platform Profiles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search name or email..."
                className="bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-6 w-full xl:w-80 focus:outline-none focus:border-yellow-500 transition-all text-sm font-medium shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- USER TABLE --- */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    User Details
                  </th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Contact
                  </th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Joined
                  </th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Status
                  </th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <Loader2
                          className="animate-spin mx-auto text-yellow-500"
                          size={40}
                        />
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center font-black text-gray-400 overflow-hidden border border-gray-200">
                              {user.profilePicture ? (
                                <img
                                  src={user.profilePicture}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-sm">
                                  {user.firstName[0]}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-xs md:text-sm uppercase tracking-tight truncate">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-5 text-[11px] md:text-xs font-bold text-gray-600">
                          {user.phone}
                        </td>
                        <td className="px-4 md:px-6 py-5 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-tighter">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 md:px-6 py-5">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${
                              user.status === "active"
                                ? "bg-green-50 text-green-600 border-green-100"
                                : "bg-red-50 text-red-600 border-red-100"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-5 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() =>
                                openConfirm(
                                  user._id,
                                  `${user.firstName} ${user.lastName}`,
                                  user.status === "active"
                                    ? "suspend"
                                    : "activate"
                                )
                              }
                              className={`p-2 md:p-3 rounded-xl transition-all ${
                                user.status === "active"
                                  ? "bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                  : "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                              }`}
                            >
                              {user.status === "active" ? (
                                <ShieldAlert size={16} />
                              ) : (
                                <ShieldCheck size={16} />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                openConfirm(
                                  user._id,
                                  `${user.firstName} ${user.lastName}`,
                                  "delete"
                                )
                              }
                              className="p-2 md:p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
