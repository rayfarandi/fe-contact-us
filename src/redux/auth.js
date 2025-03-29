import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fungsi helper untuk menyimpan data user ke localStorage
// Ini berguna untuk mempertahankan state login setelah refresh browser
const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

// Fungsi helper untuk mengambil data user dari localStorage saat aplikasi dimuat
// Jika tidak ada data user, fungsi mengembalikan null
const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

// Async thunk untuk proses login
// createAsyncThunk membuat action creator yang menangani 3 status: pending, fulfilled, rejected
export const loginUser = createAsyncThunk("auth/loginUser", async(userData) => {
    // Melakukan HTTP request POST ke endpoint login
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData)
    const {user, token} = response.data
    
    // Menyimpan token dan user ke localStorage untuk persistensi
    localStorage.setItem("token", token)
    saveUserToLocalStorage(user)
    
    // Mengembalikan data dari response untuk digunakan di reducer
    return response.data
})

// Async thunk untuk proses registrasi user baru
export const registerUser = createAsyncThunk("auth/registerUser", async(userData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData)
    return response.data
})

// Membuat slice untuk auth state
// Slice menggabungkan reducer, action creators, dan state
const authUser = createSlice({
    name: "auth", // Nama untuk slice ini, digunakan sebagai prefix untuk action types
    initialState: {
        user: loadUserFromLocalStorage(), // Mengambil user dari localStorage saat inisialisasi
        token: localStorage.getItem("token"), // Mengambil token dari localStorage saat inisialisasi
        status: "idle", // Status awal "idle"
    },
    // Reducers untuk synchronous actions
    reducers: {
        logout: (state) => {
            // Mengatur state user dan token menjadi null
            state.user = null
            state.token = null
            // Menghapus data dari localStorage
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    },
    // Reducers untuk asynchronous actions dari createAsyncThunk
    extraReducers: (builder) => {
        builder
        // Menangani state setelah login berhasil
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        })
        // Menangani state setelah registrasi berhasil
        .addCase(registerUser.fulfilled, (state) => {
            state.status = "success"
        })
    }
})

// Mengekspor action creators yang dihasilkan oleh createSlice
export const { logout } = authUser.actions
// Mengekspor reducer untuk digunakan di store
export default authUser.reducer