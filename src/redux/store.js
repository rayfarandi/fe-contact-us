import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import formReducer from "./form";

// Membuat Redux store dengan configureStore
// Ini lebih sederhana dibandingkan dengan createStore tradisional
// dan secara otomatis mengatur Redux DevTools dan middleware
export const store = configureStore({
    reducer: {
        auth: authReducer, // State untuk autentikasi
        form: formReducer, // State untuk formulir
    },
})

export default store