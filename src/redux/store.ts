import { configureStore } from "@reduxjs/toolkit";
import adminAuthSlice from "./slices/adminAuthSlice";
import dashboardSlice from "./slices/dashboardSlice";
import adminUserSlice from "./slices/adminUserSlice";
import adminFamilySlice from "./slices/adminFamilySlice";
import adminFinanceSlice from "./slices/adminFinanceSlice";
import adminAssetDiveSlice from "./slices/adminAssetDiveSlice";


export const store = configureStore({
    reducer: {
        admin: adminAuthSlice,
        dashboard: dashboardSlice,
        adminUser: adminUserSlice,
        adminFamily:adminFamilySlice,
        adminFinance: adminFinanceSlice,
        assetDive: adminAssetDiveSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;