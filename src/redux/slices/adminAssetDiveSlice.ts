import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export type ContentEnum =
    | "Family Tree" | "Family History" | "Village Story" | "Village Tradition"
    | "Language Lesson" | "King" | "Patriarch" | "Resolution"
    | "Suggestion Box" | "My Village" | "Key Date" | "Task" | "History";

export type GeneralAssetType =
    | "tasks" | "polls" | "news" | "reports" | "suggestions" | "campaigns" | "safetynets";

interface AssetDiveState {
    focusedAssets: any[];
    assetCount: number;
    currentType: string | null;
    currentCategory: "general" | "content" | null;
    loading: boolean;
    actionLoading: boolean;
    error: string | null;
}

// 💾 Load state from storage to survive refresh
const savedAudit = localStorage.getItem("kindred_audit_persistence");
const persistedState = savedAudit ? JSON.parse(savedAudit) : null;

const initialState: AssetDiveState = {
    focusedAssets: persistedState?.focusedAssets || [],
    assetCount: persistedState?.assetCount || 0,
    currentType: persistedState?.currentType || null,
    currentCategory: persistedState?.currentCategory || null,
    loading: false,
    actionLoading: false,
    error: null,
};

/**
 * FETCH GLOBAL ASSETS
 */
export const fetchGlobalAssetDive = createAsyncThunk(
    "assetDive/fetchGlobal",
    async (
        { type, category }: { type: GeneralAssetType | ContentEnum; category: "general" | "content" },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = category === "general"
                ? `admin-family/global-assets/${type.toLowerCase()}`
                : `admin-family/global-content/${encodeURIComponent(type)}`;

            const response = await axiosInstance.get(endpoint);
            return {
                data: response.data.data,
                type: type,
                category: category,
                count: response.data.count,
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || `Fetch failed`);
        }
    }
);

/**
 * DELETE GLOBAL ITEM
 */
export const deleteGlobalItem = createAsyncThunk(
    "assetDive/deleteItem",
    async (
        { id, type, category }: { id: string; type: string; category: "general" | "content" },
        { rejectWithValue }
    ) => {
        try {
            const endpoint = category === "general"
                ? `admin-family/global-assets/${type.toLowerCase()}/${id}`
                : `admin-family/global-content/${id}`;

            await axiosInstance.delete(endpoint);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Purge failed");
        }
    }
);

const assetDiveSlice = createSlice({
    name: "assetDive",
    initialState,
    reducers: {
        clearDiveData: (state) => {
            state.focusedAssets = [];
            state.assetCount = 0;
            state.currentType = null;
            state.currentCategory = null;
            localStorage.removeItem("kindred_audit_persistence");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalAssetDive.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGlobalAssetDive.fulfilled, (state, action) => {
                state.loading = false;
                state.focusedAssets = action.payload.data;
                state.assetCount = action.payload.count;
                state.currentType = action.payload.type;
                state.currentCategory = action.payload.category;

                // 💾 Persist to Local Storage
                localStorage.setItem("kindred_audit_persistence", JSON.stringify({
                    focusedAssets: action.payload.data,
                    assetCount: action.payload.count,
                    currentType: action.payload.type,
                    currentCategory: action.payload.category
                }));
            })
            .addCase(fetchGlobalAssetDive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteGlobalItem.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(deleteGlobalItem.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.focusedAssets = state.focusedAssets.filter(a => a._id !== action.payload);
                state.assetCount = Math.max(0, state.assetCount - 1);

                // 💾 Update Persistence
                const updatedStorage = { ...state, focusedAssets: state.focusedAssets, assetCount: state.assetCount };
                localStorage.setItem("kindred_audit_persistence", JSON.stringify(updatedStorage));
            })
            .addCase(deleteGlobalItem.rejected, (state) => {
                state.actionLoading = false;
            });
    },
});

export const { clearDiveData } = assetDiveSlice.actions;
export default assetDiveSlice.reducer;