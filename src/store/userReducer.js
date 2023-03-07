import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveInfoUserLogin = createAsyncThunk(
  "user/SAVE_INFO",
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const initialState = {
  data: [],
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [saveInfoUserLogin.pending]: (state) => {
      state.loading = true;
    },
    [saveInfoUserLogin.rejected]: (state, action) => {
      state.loading = false;
    },
    [saveInfoUserLogin.fulfilled]: (state, action) => {
      state.data = action?.payload || [];
      state.loading = false;
    }
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;