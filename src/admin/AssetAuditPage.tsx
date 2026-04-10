import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2,
  MapPin,
  Inbox,
  Menu,
  ChevronRight,
  Clock,
  Search,
  X,
  CheckCircle2,
  FileText,
  Target,
  Info,
  Vote,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type AppDispatch, type RootState } from "../redux/store";
import { fetchGlobalAssetDive } from "../redux/slices/adminAssetDiveSlice";
import Sidebar from "./Sidebar";

const AssetAuditPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State for the Details Modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { focusedAssets, currentType, currentCategory, loading, assetCount } =
    useSelector((state: RootState) => state.assetDive);

  useEffect(() => {
    if (currentType && currentCategory && focusedAssets.length === 0) {
      dispatch(
        fetchGlobalAssetDive({
          type: currentType as any,
          category: currentCategory,
        })
      );
    }
  }, [dispatch, currentType, currentCategory]);

  const filteredAssets = focusedAssets.filter((asset) => {
    const familyName = (
      asset.familyId?.familyName ||
      asset.family?.familyName ||
      ""
    ).toLowerCase();
    const title = (
      asset.title ||
      asset.reportName ||
      asset.question ||
      asset.contentType ||
      ""
    ).toLowerCase();
    const description = (
      asset.description ||
      asset.content ||
      asset.workDone ||
      asset.details ||
      asset.purpose ||
      ""
    ).toLowerCase();
    const query = searchTerm.toLowerCase();

    return (
      title.includes(query) ||
      description.includes(query) ||
      familyName.includes(query)
    );
  });

  if (loading && focusedAssets.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Restoring Audit Cache...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#0B0A0F] font-sans relative md:pl-4 pl-0">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* --- ASSET DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-50 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-yellow-500 text-black text-[9px] font-black uppercase rounded-full tracking-widest">
                      {currentType} audit
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">
                      ID: {selectedItem._id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                    {selectedItem.title ||
                      selectedItem.reportName ||
                      selectedItem.question ||
                      selectedItem.contentType}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
                {/* Media Section */}
                {(selectedItem.images?.length > 0 || selectedItem.imageUrl) && (
                  <div className="grid grid-cols-1 gap-2">
                    {selectedItem.imageUrl ? (
                      <img
                        src={selectedItem.imageUrl}
                        className="w-full h-64 object-cover rounded-[2rem]"
                        alt="preview"
                      />
                    ) : (
                      selectedItem.images.map((img: any, i: number) => (
                        <img
                          key={i}
                          src={img.url}
                          className="w-full h-64 object-cover rounded-[2rem]"
                          alt={`preview-${i}`}
                        />
                      ))
                    )}
                  </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <MapPin size={14} />{" "}
                      <span className="text-[10px] font-black uppercase">
                        Family Hub
                      </span>
                    </div>
                    <p className="text-sm font-bold">
                      {selectedItem.familyId?.familyName ||
                        selectedItem.family?.familyName ||
                        "Unknown"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Clock size={14} />{" "}
                      <span className="text-[10px] font-black uppercase">
                        Timestamp
                      </span>
                    </div>
                    <p className="text-sm font-bold">
                      {new Date(selectedItem.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Description / Content Section */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <Info size={14} />{" "}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Full Record Data
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap font-medium p-6 bg-gray-50 rounded-[2rem] border border-gray-100 italic">
                    {selectedItem.description ||
                      selectedItem.content ||
                      selectedItem.workDone ||
                      selectedItem.details ||
                      "No descriptive text provided for this entry."}
                  </div>
                </div>

                {/* Poll Options (If applicable) */}
                {currentType === "polls" && selectedItem.options && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                      <Vote size={14} />{" "}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Vote Breakdown
                      </span>
                    </div>
                    {selectedItem.options.map((opt: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100"
                      >
                        <span className="font-bold text-sm">{opt.text}</span>
                        <span className="px-4 py-1 bg-white rounded-xl text-xs font-black shadow-sm">
                          {opt.votes?.length || 0} Votes
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Campaign Progress (If applicable) */}
                {currentType === "campaigns" && (
                  <div className="p-6 bg-yellow-50 rounded-[2rem] border border-yellow-100">
                    <div className="flex items-center gap-2 text-yellow-700 mb-4">
                      <Target size={18} />{" "}
                      <span className="text-xs font-black uppercase">
                        Funding Progress
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold">
                        ₦{selectedItem.totalRaised?.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400">
                        Goal: ₦{selectedItem.targetAmount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-yellow-200/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${Math.min(
                            (selectedItem.totalRaised /
                              selectedItem.targetAmount) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
                >
                  Close Audit Entry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-64 w-full">
        {/* Responsive Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 lg:hidden flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <FileText size={18} className="text-black" />
            </div>
            <span className="font-black uppercase tracking-tighter text-sm">
              {currentType || "Audit"}
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-50 rounded-xl"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
          {/* Main Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                  Global Audit
                </div>
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  {assetCount} Total Entries
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#0B0A0F]">
                {currentType || "Directory"}
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder={`Filter platform records...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[1.5rem] py-4 pl-12 pr-12 text-sm font-bold shadow-sm focus:border-yellow-500 outline-none transition-all"
              />
              {searchTerm && (
                <X
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
          </header>

          {/* Records Grid */}
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAssets.map((asset, idx) => {
                const familyOrigin =
                  asset.familyId?.familyName ||
                  asset.family?.familyName ||
                  "Platform Hub";
                return (
                  <div
                    key={asset._id || idx}
                    onClick={() => setSelectedItem(asset)}
                    className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-500 group overflow-hidden flex flex-col"
                  >
                    <div className="p-6 pb-0 flex justify-between items-center">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-gray-500 border border-gray-100">
                        <MapPin size={12} className="text-yellow-600" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          {familyOrigin}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-gray-200 group-hover:text-yellow-500 transition-colors">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="p-8 pt-6 flex-1">
                      <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2">
                        {asset.title ||
                          asset.reportName ||
                          asset.question ||
                          asset.contentType}
                      </h3>

                      {/* Mini Preview for Reports */}
                      {currentType === "reports" && (
                        <div className="mb-4 bg-gray-50 p-3 rounded-xl">
                          <div className="h-1.5 w-full bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-yellow-500"
                              style={{
                                width: `${asset.completionPercentage || 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Mini Preview for Tasks */}
                      {currentType === "tasks" && (
                        <div
                          className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            asset.status === "completed"
                              ? "bg-green-50 text-green-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {asset.status === "completed" ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <Clock size={10} />
                          )}{" "}
                          {asset.status}
                        </div>
                      )}

                      {/* Media Thumbnail */}
                      {(asset.images?.length > 0 || asset.imageUrl) && (
                        <div className="relative h-40 w-full mb-6 rounded-3xl overflow-hidden bg-gray-100 grayscale-[50%] group-hover:grayscale-0 transition-all duration-500">
                          <img
                            src={asset.imageUrl || asset.images[0]?.url}
                            alt="media"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3 italic">
                        {asset.description ||
                          asset.content ||
                          asset.workDone ||
                          asset.details ||
                          "Click to view expanded record."}
                      </p>
                    </div>

                    <div className="p-6 mt-auto bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Clock size={14} className="text-yellow-500" />
                        {new Date(asset.createdAt).toLocaleDateString("en-GB")}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-gray-300 group-hover:text-black transition-colors">
                        Expand Record <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center bg-white border border-dashed border-gray-200 rounded-[4rem] text-center">
              <Inbox className="text-gray-200 mb-6" size={64} />
              <p className="text-gray-400 font-black uppercase text-sm tracking-[0.4em]">
                Empty Ledger
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssetAuditPage;
