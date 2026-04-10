import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface Campaign {
    _id: string;
    family: { _id: string; familyName: string };
    createdBy: { firstName: string; lastName: string };
    title: string;
    purpose: string;
    targetAmount: number;
    totalRaised: number;
    status: "ACTIVE" | "COMPLETED" | "CANCELLED";
    deadline: string;
    createdAt: string;
}

interface Contribution {
    _id: string;
    campaign: string | any;
    contributor: { firstName: string; lastName: string; email: string };
    amountSent: number;
    verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
    paymentProof: { url: string };
    createdAt: string;
}

interface AdminFinanceState {
    campaigns: Campaign[];
    contributions: Contribution[];
    loading: boolean;
    actionLoading: boolean;
    error: string | null;
}

const initialState: AdminFinanceState = {
    campaigns: [],
    contributions: [],
    loading: false,
    actionLoading: false,
    error: null,
};

// --- ASYNC THUNKS ---

// 1. Fetch All Platform Campaigns
export const fetchAllCampaigns = createAsyncThunk(
    "adminFinance/fetchAllCampaigns",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("admin-finance/campaigns");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch campaigns");
        }
    }
);

// 2. Fetch Contributions for a Specific Campaign
export const fetchCampaignContributions = createAsyncThunk(
    "adminFinance/fetchContributions",
    async (campaignId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`admin-finance/campaigns/${campaignId}/contributions`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch contributions");
        }
    }
);

// 3. Admin Verification of Payment
export const verifyContribution = createAsyncThunk(
    "adminFinance/verify",
    async ({ id, status, reason }: { id: string; status: "VERIFIED" | "REJECTED"; reason?: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`admin-finance/verify-contribution/${id}`, {
                status,
                rejectionReason: reason
            });
            return response.data.contribution;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Verification failed");
        }
    }
);

// 4. Nuclear Delete Campaign
export const deleteCampaign = createAsyncThunk(
    "adminFinance/delete",
    async (id: string, { rejectWithValue }) => {
        if (!window.confirm("☢️ NUCLEAR OPTION: Delete this campaign and all associated payment records?")) return rejectWithValue("Cancelled");
        try {
            await axiosInstance.delete(`admin-finance/campaign/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Deletion failed");
        }
    }
);

const adminFinanceSlice = createSlice({
    name: "adminFinance",
    initialState,
    reducers: {
        clearFinanceError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Campaigns
            .addCase(fetchAllCampaigns.pending, (state) => { state.loading = true; })
            .addCase(fetchAllCampaigns.fulfilled, (state, action) => {
                state.loading = false;
                state.campaigns = action.payload;
            })
            .addCase(fetchAllCampaigns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Contributions
            .addCase(fetchCampaignContributions.fulfilled, (state, action) => {
                state.contributions = action.payload;
            })

            // Verify Contribution
            .addCase(verifyContribution.pending, (state) => { state.actionLoading = true; })
            .addCase(verifyContribution.fulfilled, (state, action) => {
                state.actionLoading = false;
                const index = state.contributions.findIndex(c => c._id === action.payload._id);
                if (index !== -1) state.contributions[index] = action.payload;

                // Update totalRaised in the campaign locally as well
                const campIndex = state.campaigns.findIndex(c => c._id === action.payload.campaign);
                if (campIndex !== -1 && action.payload.verificationStatus === "VERIFIED") {
                    state.campaigns[campIndex].totalRaised += action.payload.amountSent;
                }
            })

            // Delete Campaign
            .addCase(deleteCampaign.fulfilled, (state, action) => {
                state.campaigns = state.campaigns.filter(c => c._id !== action.payload);
            });
    }
});

export const { clearFinanceError } = adminFinanceSlice.actions;
export default adminFinanceSlice.reducer;