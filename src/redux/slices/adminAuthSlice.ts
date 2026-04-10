import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface AdminAuthState {
    admin: any | null;
    token: string | null;
    loading: boolean;
    otpSent: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AdminAuthState = {
    admin: null,
    token: typeof window !== "undefined" ? localStorage.getItem("adminToken") : null,
    loading: false,
    otpSent: false,
    error: null,
    success: false,
};

/**
 * 1. Request OTP via Email
 * Refactored to target the new email-based dispatch protocol
 */
export const sendAdminOtp = createAsyncThunk(
    "adminAuth/sendOtp",
    async (payload: { email: string }, { rejectWithValue }) => {
        console.log("--- [REDUX] REQUESTING EMAIL OTP DISPATCH ---", payload);
        try {
            const response = await axiosInstance.post("admin/send-otp", payload);
            console.log("✅ [REDUX] OTP DISPATCH SUCCESS:", response.data);
            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Failed to dispatch OTP email";
            console.error("❌ [REDUX] OTP API ERROR:", errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

/**
 * 2. Verify OTP via Email & Persist Token
 */
export const verifyAdminOtp = createAsyncThunk(
    "adminAuth/verifyOtp",
    async (payload: { email: string; otp: string }, { rejectWithValue }) => {
        console.log("--- [REDUX] VERIFYING EMAIL AUTH KEY ---", payload);
        try {
            const response = await axiosInstance.post("admin/verify-otp", payload);

            if (response.data.token) {
                console.log("🔑 [REDUX] ACCESS TOKEN SECURED. PERSISTING...");
                localStorage.setItem("adminToken", response.data.token);
            } else {
                console.warn("⚠️ [REDUX] VERIFICATION PASSED BUT NO TOKEN PROVIDED.");
            }

            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Verification of access key failed";
            console.error("❌ [REDUX] VERIFICATION ERROR:", errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        resetAuthStatus: (state) => {
            console.log("🧹 [REDUX] RESETTING AUTH STATUS");
            state.error = null;
            state.success = false;
        },
        logoutAdmin: (state) => {
            console.log("🔌 [REDUX] TERMINATING ADMIN SESSION.");
            state.admin = null;
            state.token = null;
            state.otpSent = false;
            localStorage.removeItem("adminToken");
            console.log("🗑️ [REDUX] SECURITY PURGE COMPLETE.");
        },
    },
    extraReducers: (builder) => {
        builder
            // SEND OTP LIFECYCLE
            .addCase(sendAdminOtp.pending, (state) => {
                console.log("⏳ [REDUX] SEND_OTP: PENDING...");
                state.loading = true;
                state.error = null;
                state.otpSent = false;
            })
            .addCase(sendAdminOtp.fulfilled, (state) => {
                console.log("✨ [REDUX] SEND_OTP: FULFILLED. AWAITING EMAIL CODE.");
                state.loading = false;
                state.otpSent = true;
                state.success = true;
            })
            .addCase(sendAdminOtp.rejected, (state, action) => {
                console.log("🔥 [REDUX] SEND_OTP: REJECTED.");
                state.loading = false;
                state.error = action.payload as string;
            })

            // VERIFY OTP LIFECYCLE
            .addCase(verifyAdminOtp.pending, (state) => {
                console.log("⏳ [REDUX] VERIFY_OTP: PENDING...");
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyAdminOtp.fulfilled, (state, action) => {
                console.log("🚀 [REDUX] VERIFY_OTP: SUCCESS. SYNCING ADMIN PROFILE.");
                state.loading = false;
                state.admin = action.payload.admin;
                state.token = action.payload.token;
                state.success = true;
            })
            .addCase(verifyAdminOtp.rejected, (state, action) => {
                console.log("🔥 [REDUX] VERIFY_OTP: REJECTED.");
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetAuthStatus, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;