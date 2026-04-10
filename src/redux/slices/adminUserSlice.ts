import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: "active" | "suspended";
    isVerified: boolean;
    createdAt: string;
    [key: string]: any;
}

interface AdminUserState {
    users: UserProfile[];
    loading: boolean;
    actionLoading: boolean; // For specific actions like delete/suspend
    error: string | null;
    success: boolean;
}

const initialState: AdminUserState = {
    users: [],
    loading: false,
    actionLoading: false,
    error: null,
    success: false,
};

// --- ASYNC THUNKS ---

// 1. Fetch All Users
export const fetchAllUsers = createAsyncThunk(
    "adminUser/fetchAll",
    async (_, { rejectWithValue }) => {
        console.log("📂 [REDUX] FETCHING GLOBAL USER DIRECTORY...");
        try {
            const response = await axiosInstance.get("admin-user/users");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

// 2. Update User Profile
export const updateUserProfile = createAsyncThunk(
    "adminUser/update",
    async ({ id, data }: { id: string; data: Partial<UserProfile> }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`admin-user/users/${id}`, data);
            console.log(`✅ [REDUX] USER ${id} UPDATED SUCCESSFULLY`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// 3. Toggle Suspension
export const toggleUserSuspension = createAsyncThunk(
    "adminUser/toggleSuspension",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`admin-user/users/${id}/suspend`);
            console.log(`🔒 [REDUX] USER ${id} STATUS CHANGED:`, response.data.status);
            return { id, status: response.data.status };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Suspension toggle failed");
        }
    }
);

// 4. Delete User Account
export const deleteUserAccount = createAsyncThunk(
    "adminUser/delete",
    async (id: string, { rejectWithValue }) => {
        if (!window.confirm("ARE YOU SURE? This action is permanent and cannot be undone.")) return rejectWithValue("Cancelled");
        try {
            await axiosInstance.delete(`admin-user/users/${id}`);
            console.log(`🗑️ [REDUX] USER ${id} PURGED FROM SYSTEM`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Deletion failed");
        }
    }
);

const adminUserSlice = createSlice({
    name: "adminUser",
    initialState,
    reducers: {
        resetUserStatus: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.users[index] = action.payload;
                state.success = true;
            })

            // Suspension Toggle
            .addCase(toggleUserSuspension.pending, (state) => { state.actionLoading = true; })
            .addCase(toggleUserSuspension.fulfilled, (state, action) => {
                state.actionLoading = false;
                const user = state.users.find(u => u._id === action.payload.id);
                if (user) user.status = action.payload.status;
            })

            // Delete
            .addCase(deleteUserAccount.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u._id !== action.payload);
            });
    }
});

export const { resetUserStatus } = adminUserSlice.actions;
export default adminUserSlice.reducer;