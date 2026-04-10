import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface DashboardStats {
    overview: {
        totalUsers: number;
        totalFamilies: number;
        platformActivityScore: number;
    };
    features: {
        tasks: number;
        activePolls: number;
        suggestions: number;
        reports: number;
        news: number;
        safetyNets: number;
    };
    finance: {
        campaigns: number;
        contributions: number;
    };
    content: {
        [key: string]: number;
    };
}

interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;
    lastUpdated: string | null;
}

const initialState: DashboardState = {
    stats: null,
    loading: false,
    error: null,
    lastUpdated: null,
};

// --- Async Thunk: Fetch Master Platform Stats ---
export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchMasterStats",
    async (_, { rejectWithValue }) => {
        console.log("--- [REDUX] REQUESTING MASTER PLATFORM UPLINK ---");
        try {
            // Points to the new master-stats endpoint without ID
            const response = await axiosInstance.get("dashboard/master-stats");
            console.log("📊 [REDUX] MASTER DATA RETRIEVED:", response.data);
            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Failed to sync platform metrics";
            console.error("🚨 [REDUX] MASTER SYNC ERROR:", errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardData: (state) => {
            state.stats = null;
            state.error = null;
            state.lastUpdated = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;