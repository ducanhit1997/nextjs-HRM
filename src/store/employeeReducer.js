import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getlistEmployee, editEmployee, addEmployee, deleteEmployee } from "../services/api/employee";

export const getListEmployeeRequest = createAsyncThunk(
  "employee/GET_LIST",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getlistEmployee();
      return res;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const editEmployeeRequest = createAsyncThunk(
  "employee/EDIT",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await editEmployee(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const addEmployeeRequest = createAsyncThunk(
  "employee/ADD",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addEmployee(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const deleteEmployeeRequest = createAsyncThunk(
  "employee/DELETE",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deleteEmployee(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  addSuccess: false,
  editSuccess: false,
  deleteSuccess: false,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  extraReducers: {
    [getListEmployeeRequest.pending]: (state) => {
      state.loading = true;
    },
    [getListEmployeeRequest.rejected]: (state, action) => {
      state.loading = false;
    },
    [getListEmployeeRequest.fulfilled]: (state, action) => {
      state.data = action?.payload || [];
      state.loading = false;
    },

    [editEmployeeRequest.pending]: (state) => {
      state.editSuccess = false;
    },
    [editEmployeeRequest.rejected]: (state, action) => {
      state.editSuccess = false;
    },
    [editEmployeeRequest.fulfilled]: (state, action) => {
      state.editSuccess = true;
    },

    [addEmployeeRequest.pending]: (state) => {
      state.addSuccess = false;
    },
    [addEmployeeRequest.rejected]: (state, action) => {
      state.addSuccess = false;
    },
    [addEmployeeRequest.fulfilled]: (state, action) => {
      state.addSuccess = true;
    },

    [deleteEmployeeRequest.pending]: (state) => {
      state.deleteSuccess = false;
    },
    [deleteEmployeeRequest.rejected]: (state, action) => {
      state.deleteSuccess = false;
    },
    [deleteEmployeeRequest.fulfilled]: (state, action) => {
      state.deleteSuccess = true;
    },
  },
});

const { reducer: employeeReducer } = employeeSlice;
export default employeeReducer;