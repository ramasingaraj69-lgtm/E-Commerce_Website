import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../service/api";

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(data, { rejectWithValue }) => {
        try {
            const res = await API.post(
                "users/login/",
                data
            );

            return res.data;

        } catch (err) {

            if (err.response && err.response.data) {

                return rejectWithValue(
                    err.response.data.error
                );
            }

            return rejectWithValue(
                "Login failed"
            );
        }
    }
);

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(data, { rejectWithValue }) => {
        try {

            const res = await API.post(
                "users/register/",
                data
            );

            return res.data;

        } catch (err) {

            if (err.response && err.response.data) {

                return rejectWithValue(
                    err.response.data.error
                );
            }

            return rejectWithValue(
                "Register failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder

        // LOGIN
            .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;

            state.user = action.payload.user;
            state.token = action.payload.token;
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // REGISTER
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;

            state.user = action.payload.user || null;
        })

        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;