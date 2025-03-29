import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk mengirim formulir
export const submitForm = createAsyncThunk(
  "form/submit",
  async (formData, { getState, rejectWithValue }) => {
    // Mengambil token dari auth state
    const token = getState().auth.token;
    try {
      // Melakukan HTTP request POST dengan header Authorization
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forms`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      // Jika terjadi error, mengembalikan data error untuk digunakan di reducer
      if (error.response && error.response.data) {
        // Mengembalikan seluruh error response data dari backend
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Network Error",
        error: error.message,
      });
    }
  }
);

// Async thunk untuk mengambil formulir user yang sedang login
export const fetchUserForms = createAsyncThunk(
  "form/fetchUserForms",
  async (_, { getState }) => {
    const token = getState().auth.token;
    // Mengambil data formulir pengguna dengan endpoint /forms/mine
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/forms/mine`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  }
);

// Async thunk untuk mengambil semua formulir (untuk Admin)
export const fetchAllForms = createAsyncThunk(
  "form/fetchAllForms",
  async (_, { getState }) => {
    const token = getState().auth.token;
    // Mengambil semua data formulir dari endpoint /forms
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  }
);

// Async thunk untuk mendapatkan detail formulir berdasarkan ID
export const getFormById = createAsyncThunk(
  "form/getFormById",
  async (id, { getState }) => {
    const token = getState().auth.token;
    // Mengambil detail formulir dari endpoint /forms/:id
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/forms/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  }
);

// Async thunk untuk memperbarui status formulir
export const updateFormStatus = createAsyncThunk(
  "form/updateFormStatus",
  async ({ id, status }, { getState }) => {
    const token = getState().auth.token;
    // Melakukan PATCH request untuk mengupdate status formulir
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/forms/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// Async thunk untuk menghapus formulir
export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async (id, { getState }) => {
    const token = getState().auth.token;
    // Melakukan DELETE request untuk menghapus formulir
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/forms/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// Membuat slice untuk form state
const formSlice = createSlice({
  name: "form", // Nama untuk slice ini
  initialState: { 
    forms: [], // Array untuk menyimpan formulir
    status: "idle", // Status awal
    loading: false, // Flag loading
    error: null // Menyimpan error jika ada
  },
  reducers: {}, // Tidak ada reducers synchronous untuk slice ini
  extraReducers: (builder) => {
    builder
      // Menangani state setelah submit form berhasil
      .addCase(submitForm.fulfilled, (state, action) => {
        // Menambahkan form baru ke array forms
        state.forms.push(action.payload);
      })
      // Menangani state setelah fetch user forms berhasil
      .addCase(fetchUserForms.fulfilled, (state, action) => {
        // Mengisi array forms dengan data dari response
        state.forms = action.payload;
      })
      // Menangani state setelah fetch all forms berhasil
      .addCase(fetchAllForms.fulfilled, (state, action) => {
        // Mengisi array forms dengan data dari response
        state.forms = action.payload;
      })
      // Menangani state setelah get form by id berhasil
      .addCase(getFormById.fulfilled, (state, action) => {
        // Menyimpan detail form ke state formDetail
        state.formDetail = action.payload;
      })
      // Menangani state setelah delete form berhasil
      .addCase(deleteForm.fulfilled, (state, action) => {
        // Menghapus form yang dihapus dari array forms
        state.forms = state.forms.filter((form) => form.id !== action.payload);
      });
  },
});

export default formSlice.reducer;