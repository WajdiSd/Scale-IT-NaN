import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import VerifyCode from "src/pages/auth/VerifyCode";
import authService from "../service/authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isAuthenticated: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Verify user Account
export const verifyAccount = createAsyncThunk("auth/verify", async (id, thunkAPI) => {
  try {
    return await authService.verifyUser(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
/**
 * forgot password steps 
 */

//send mail to user
export const sendMail = createAsyncThunk(
  "auth/sendMail", 
  async(userEmail, thunkAPI) => {
    try {
      return await authService.sendMail(userEmail);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// change Password 
export const changePassword = createAsyncThunk("auth/changePassword", async (userEmail,newPassword) => {
  try {
    return await authService.changePassword(userEmail,newPassword);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyCodeRecoverPwd = createAsyncThunk("auth/verifyCodeRecoverPwd", async (userEmail,code) => {
  try {
    return await authService.verifyCodeRecoverPwd(userEmail,code);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const verifyCode = createAsyncThunk("auth/verifyCode", async (code) => {
  try {
    return await authService.verifyCode(code);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        console.log("pending")
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fulfilled")
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected")
        console.log(action)

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("logout fulfilled")

        state.user = null;
        state.isAuthenticated = false;

      })
      .addCase(verifyAccount.fulfilled, (state) => {
        console.log("verifyAccount fulfilled")
        return action.payload
      })
      .addCase(sendMail.fulfilled, (state) => {
        console.log("sendMail fulfilled")
        return action.payload
      })
      .addCase(sendMail.rejected, (state, action) => {
        return action.payload
      })
      .addCase(verifyCodeRecoverPwd.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(verifyCodeRecoverPwd.rejected, (state, action) => {
        return action.payload
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(verifyCode.rejected, (state, action) => {
        return action.payload
      })
      
      
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
