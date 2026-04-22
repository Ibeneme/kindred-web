import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderTree,
  CreditCard,
  LogOut,
  ShieldCheck,
  Newspaper,
  Vote,
  History,
  MessageSquare,
  ShieldAlert,
  X,
  Search,
  TreeDeciduous,
  GraduationCap,
  UserRoundCheck,
  ClipboardCheck,
  Map,
  CalendarDays,
  // LifeBuoy,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux/slices/adminAuthSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchGlobalAssetDive,
  type ContentEnum,
  type GeneralAssetType,
} from "../redux/slices/adminAssetDiveSlice";
import { type RootState } from "../redux/store";

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const [navSearch, setNavSearch] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Get active audit from Redux
  const { currentType } = useSelector((state: RootState) => state.assetDive);

  const handleGlobalDive = (
    type: GeneralAssetType | ContentEnum,
    category: "general" | "content"
  ) => {
    dispatch(fetchGlobalAssetDive({ type, category }));
    navigate("/admin/audit-viewer");
    setIsOpen(false);
  };

  const isAuditActive = (type: string) =>
    location.pathname === "/admin/audit-viewer" && currentType === type;

  const mainNav = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <Users size={18} />,
      label: "User Directory",
      path: "/admin/users",
    },
    {
      icon: <FolderTree size={18} />,
      label: "Family Hubs",
      path: "/admin/families",
    },
    {
      icon: <CreditCard size={18} />,
      label: "Financials",
      path: "/admin/finance",
    },
  ];

  const platformOps: { icon: any; label: string; type: GeneralAssetType }[] = [
    { icon: <Vote size={18} />, label: "All Polls", type: "polls" },
    { icon: <Newspaper size={18} />, label: "News Feed", type: "news" },
    { icon: <ListChecks size={18} />, label: "System Tasks", type: "tasks" },
    {
      icon: <ShieldAlert size={18} />,
      label: "Incident Reports",
      type: "reports",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Suggestions",
      type: "suggestions",
    },
    { icon: <CreditCard size={18} />, label: "Campaigns", type: "campaigns" },
    // { icon: <LifeBuoy size={18} />, label: "Safety Nets", type: "safetynets" },
  ];

  const culturalArchive: { icon: any; label: string; type: ContentEnum }[] = [
    {
      icon: <TreeDeciduous size={18} />,
      label: "Family Trees",
      type: "Family Tree",
    },
    { icon: <History size={18} />, label: "Oral Histories", type: "History" },
    // {
    //   icon: <ScrollText size={18} />,
    //   label: "Family History",
    //   type: "Family History",
    // },
    // {
    //   icon: <BookOpen size={18} />,
    //   label: "Village Stories",
    //   type: "Village Story",
    // },
    // { icon: <Crown size={18} />, label: "Kings/Royalty", type: "King" },
    {
      icon: <UserRoundCheck size={18} />,
      label: "Patriarchs",
      type: "Patriarch",
    },
    {
      icon: <GraduationCap size={18} />,
      label: "Language",
      type: "Language Lesson",
    },
    {
      icon: <ClipboardCheck size={18} />,
      label: "Resolutions",
      type: "Resolution",
    },
    { icon: <Map size={18} />, label: "My Village", type: "My Village" },
    { icon: <CalendarDays size={18} />, label: "Key Dates", type: "Key Date" },
  ];

  const filterItems = (arr: any[]) =>
    arr.filter((i) => i.label.toLowerCase().includes(navSearch.toLowerCase()));

  return (
    <>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center"
            >
              <AlertTriangle
                className="mx-auto mb-4 text-amber-500"
                size={48}
              />
              <h3 className="text-xl font-black uppercase mb-2 text-black">
                Logout?
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Terminate your administrative session?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    dispatch(logoutAdmin());
                    navigate("/admin");
                  }}
                  className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Terminate
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 flex flex-col z-[70] transition-all duration-300 w-72 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-black text-xl tracking-tighter uppercase">
              Kokohor
            </h2>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Jump to audit..."
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-9 text-xs font-bold focus:ring-2 focus:ring-yellow-500/20 outline-none"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pb-10">
          <div className="py-4">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">
              Platform
            </p>
            {filterItems(mainNav).map((i) => (
              <NavItem
                key={i.label}
                icon={i.icon}
                label={i.label}
                active={location.pathname === i.path}
                onClick={() => {
                  navigate(i.path);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
          <div className="py-2 border-t border-gray-50">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2 pt-4">
              Operations
            </p>
            {filterItems(platformOps).map((i) => (
              <NavItem
                key={i.label}
                icon={i.icon}
                label={i.label}
                active={isAuditActive(i.type)}
                onClick={() => handleGlobalDive(i.type, "general")}
              />
            ))}
          </div>
          <div className="py-2 border-t border-gray-50">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2 pt-4">
              Archive
            </p>
            {filterItems(culturalArchive).map((i) => (
              <NavItem
                key={i.label}
                icon={i.icon}
                label={i.label}
                active={isAuditActive(i.type)}
                onClick={() => handleGlobalDive(i.type, "content")}
              />
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 p-4 text-gray-400 hover:text-red-500 transition-all font-black uppercase text-[10px] tracking-widest group"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all mb-1 ${
      active
        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
        : "text-gray-400 hover:bg-gray-50 hover:text-black"
    }`}
  >
    {icon}{" "}
    <span className="font-bold text-xs uppercase tracking-widest flex-1">
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="activeInd"
        className="w-1.5 h-1.5 rounded-full bg-black"
      />
    )}
  </div>
);

export default Sidebar;
