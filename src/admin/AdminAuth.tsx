import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Zap,
  ShieldCheck,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  sendAdminOtp,
  verifyAdminOtp,
  resetAuthStatus,
} from "../redux/slices/adminAuthSlice";
import type { AppDispatch, RootState } from "../redux/store";

const AdminAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize navigate

  const { loading, otpSent, error, success, token } = useSelector(
    (state: RootState) => state.admin // Ensure this matches your store key
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  // 1. Handle Navigation on Success
  useEffect(() => {
    if (success && token && otpSent) {
      console.log("🚀 Auth Success: Redirecting to Dashboard...");
      navigate("/admin/dashboard");
    }
  }, [success, token, otpSent, navigate]);

  // 2. Handle errors from Redux
  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const closeError = () => {
    setLocalError(null);
    dispatch(resetAuthStatus());
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber)
      return setLocalError("Security clearance requires a phone number.");

    const formattedPhone = phoneNumber.startsWith("0")
      ? `+234${phoneNumber.substring(1)}`
      : phoneNumber.startsWith("+234")
      ? phoneNumber
      : `+234${phoneNumber}`;

    dispatch(sendAdminOtp({ phoneNumber: formattedPhone }));
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return setLocalError("OTP must be exactly 6 digits.");

    const formattedPhone = phoneNumber.startsWith("0")
      ? `+234${phoneNumber.substring(1)}`
      : phoneNumber.startsWith("+234")
      ? phoneNumber
      : `+234${phoneNumber}`;

    dispatch(verifyAdminOtp({ phoneNumber: formattedPhone, otp }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0A0F] overflow-hidden px-6 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-500 opacity-[0.1] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-yellow-600 opacity-[0.05] blur-[120px] rounded-full" />

      {/* ERROR MODAL */}
      <AnimatePresence>
        {localError && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeError}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm p-8 rounded-[2.5rem] border border-white/10 bg-[#121118] shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <AlertCircle className="text-red-500" size={32} />
              </div>
              <h3 className="text-white text-xl font-bold tracking-tight mb-2">
                Authentication Error
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                {localError}
              </p>
              <button
                onClick={closeError}
                className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 lg:p-12 rounded-[3rem] border border-white/5 bg-black/60 backdrop-blur-3xl shadow-2xl"
        >
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-yellow-500/20 mb-8 border border-yellow-400/30">
              <ShieldCheck className="text-black" size={40} strokeWidth={2} />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight text-center uppercase">
              {otpSent ? "Verify Code" : "Admin Login"}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-4">
              {otpSent
                ? "Continue to verify"
                : "Enter phone number to continue"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.form
                key="phone-state"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-[10px] text-yellow-500 font-black uppercase tracking-widest ml-1">
                    Secure Phone Uplink
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-5 flex items-center gap-2 pointer-events-none border-r border-white/10 pr-3 mr-3">
                      <svg width="20" height="15" viewBox="0 0 3 2">
                        <rect width="1" height="2" fill="#008751" />
                        <rect width="1" height="2" x="1" fill="#FFFFFF" />
                        <rect width="1" height="2" x="2" fill="#008751" />
                      </svg>
                      <span className="text-gray-400 font-bold text-sm">
                        +234
                      </span>
                    </div>
                    <input
                      type="tel"
                      placeholder="801 234 5678"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-28 pr-5 text-white focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-white hover:bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Authorize Session"
                  )}
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="otp-state"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleVerifyOtp}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[10px] text-yellow-500 font-black uppercase tracking-widest text-center block">
                    Security OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    className="w-full bg-transparent border-b-2 border-white/10 rounded-none py-4 text-center text-5xl font-black tracking-[1.2rem] text-yellow-500 focus:outline-none focus:border-yellow-500 transition-all"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.15)] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Verify Access"
                  )}
                  <Zap size={20} className="fill-black" />
                </button>
                <button
                  type="button"
                  className="w-full text-center text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-yellow-500 transition-colors"
                  onClick={() => dispatch(sendAdminOtp({ phoneNumber }))}
                >
                  Regenerate OTP
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminAuth;
