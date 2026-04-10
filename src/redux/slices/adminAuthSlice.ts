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
    token: localStorage.getItem("adminToken"),
    loading: false,
    otpSent: false,
    error: null,
    success: false,
};

// 1. Request OTP
export const sendAdminOtp = createAsyncThunk(
    "adminAuth/sendOtp",
    async (payload: { phoneNumber: string }, { rejectWithValue }) => {
        console.log("--- [REDUX] REQUESTING OTP DISPATCH ---", payload);
        try {
            const response = await axiosInstance.post("admin/send-otp", payload);
            console.log("✅ [REDUX] OTP API SUCCESS:", response.data);
            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Failed to send OTP";
            console.error("❌ [REDUX] OTP API ERROR:", errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// 2. Verify OTP & Persist Token
export const verifyAdminOtp = createAsyncThunk(
    "adminAuth/verifyOtp",
    async (payload: { phoneNumber: string; otp: string }, { rejectWithValue }) => {
        console.log("--- [REDUX] VERIFYING NEURAL KEY ---", payload);
        try {
            const response = await axiosInstance.post("admin/verify-otp", payload);

            if (response.data.token) {
                console.log("🔑 [REDUX] TOKEN RECEIVED. PERSISTING TO LOCALSTORAGE...");
                localStorage.setItem("adminToken", response.data.token);
                console.log("💾 [REDUX] LOCALSTORAGE SYNC COMPLETE.");
            } else {
                console.warn("⚠️ [REDUX] VERIFICATION SUCCESSFUL BUT NO TOKEN RETURNED.");
            }

            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Verification failed";
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
            console.log("🔌 [REDUX] LOGGING OUT... CLEARING SESSION DATA.");
            state.admin = null;
            state.token = null;
            state.otpSent = false;
            localStorage.removeItem("adminToken");
            console.log("🗑️ [REDUX] LOCALSTORAGE PURGED.");
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
                console.log("✨ [REDUX] SEND_OTP: FULFILLED. UI SHOULD SHOW OTP INPUT.");
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
                console.log("🚀 [REDUX] VERIFY_OTP: FULFILLED. UPDATING GLOBAL STATE.");
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