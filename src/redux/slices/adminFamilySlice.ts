import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface FamilyAssetSummary {
    familyInfo: any;
    assets: {
        tasks: any[];
        polls: any[];
        suggestions: any[];
        reports: any[];
        news: any[];
        content: any[];
        campaigns: any[];
        safetyNets: any[];
        countSummary: {
            tasks: number;
            polls: number;
            content: number;
            campaigns: number;
        };
    };
}

interface AdminFamilyState {
    families: any[];
    activeFamilyDetails: FamilyAssetSummary | null;
    loading: boolean;
    actionLoading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AdminFamilyState = {
    families: [],
    activeFamilyDetails: null,
    loading: false,
    actionLoading: false,
    error: null,
    success: false,
};

// --- ASYNC THUNKS ---

// 1. Fetch All Families (Directory)
export const fetchAllFamilies = createAsyncThunk(
    "adminFamily/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("admin-family/all");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch families");
        }
    }
);

// 2. Deep Dive: Fetch specific family details & all assets
export const fetchFamilyDeepDive = createAsyncThunk(
    "adminFamily/fetchDeepDive",
    async (familyId: string, { rejectWithValue }) => {
        console.log(`--- [REDUX] EXECUTING DEEP DIVE: ${familyId} ---`);
        try {
            const response = await axiosInstance.get(`admin-family/details/${familyId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Deep dive failed");
        }
    }
);

// 3. Toggle Family Suspension
export const toggleFamilySuspension = createAsyncThunk(
    "adminFamily/toggleSuspension",
    async (familyId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`admin-family/${familyId}/suspend`);
            return { familyId, status: response.data.status };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Suspension failed");
        }
    }
);

// 4. Nuclear Delete
export const deleteFamilyPermanently = createAsyncThunk(
    "adminFamily/deletePermanent",
    async (familyId: string, { rejectWithValue }) => {
        if (!window.confirm("☢️ NUCLEAR OPTION: This will delete the family and ALL associated data (polls, news, content). Continue?")) {
            return rejectWithValue("Cancelled");
        }
        try {
            await axiosInstance.delete(`admin-family/${familyId}`);
            return familyId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Deletion failed");
        }
    }
);

const adminFamilySlice = createSlice({
    name: "adminFamily",
    initialState,
    reducers: {
        clearActiveFamily: (state) => {
            state.activeFamilyDetails = null;
        },
        resetFamilyStatus: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Families
            .addCase(fetchAllFamilies.pending, (state) => { state.loading = true; })
            .addCase(fetchAllFamilies.fulfilled, (state, action) => {
                state.loading = false;
                state.families = action.payload;
            })

            // Deep Dive
            .addCase(fetchFamilyDeepDive.pending, (state) => { state.loading = true; })
            .addCase(fetchFamilyDeepDive.fulfilled, (state, action) => {
                state.loading = false;
                state.activeFamilyDetails = action.payload;
            })

            // Suspension
            .addCase(toggleFamilySuspension.fulfilled, (state, action) => {
                const family = state.families.find(f => f._id === action.payload.familyId);
                if (family) family.status = action.payload.status;
                if (state.activeFamilyDetails?.familyInfo._id === action.payload.familyId) {
                    state.activeFamilyDetails.familyInfo.status = action.payload.status;
                }
            })

            // Permanent Delete
            .addCase(deleteFamilyPermanently.fulfilled, (state, action) => {
                state.families = state.families.filter(f => f._id !== action.payload);
                state.activeFamilyDetails = null;
            });
    }
});

export const { clearActiveFamily, resetFamilyStatus } = adminFamilySlice.actions;
export default adminFamilySlice.reducer;