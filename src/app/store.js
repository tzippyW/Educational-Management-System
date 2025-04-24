import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/students/studentSlice";

export const store = configureStore({
    reducer: {
        users: studentSlice,
    }
});
