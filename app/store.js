import authSlice from "@/reducers/authSlice";
import userSlice from "@/reducers/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default Store;
