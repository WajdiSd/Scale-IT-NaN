//import VerifyCode from "src/pages/auth/VerifyCode";
import authService from "../service/authService";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isAuthenticated: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Verify user Account
// verif user
export const verifyAccount = createAsyncThunk('auth/verify', async (id, thunkAPI) => {

  try {
    return await authService.verifyUser(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// update User Password
export const updateUserPassword = createAsyncThunk('auth/updateUserPassword', async (obj, thunkAPI) => {
  try {
    return await authService.updateUserPassword(obj);
  } catch (error) {
    console.log(error);

    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update User Password
export const resetUserPassword = createAsyncThunk('auth/resetUserPassword', async (obj, thunkAPI) => {
  try {
    return await authService.resetUserPassword(obj);
  } catch (error) {
    console.log(error);

    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete user
export const DeleteAccount = createAsyncThunk('auth/delete', async (id, thunkAPI) => {
  try {
    return await authService.deleteUser(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


//update user info
export const updateUser = createAsyncThunk('auth/updateUser', async (data, thunkAPI) => {
  try {
    
    return await authService.updateUser(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});
/**
 * forgot password steps 
 */

//send mail to user
export const sendCode = createAsyncThunk(
  "auth/sendCode", 
  async(data, thunkAPI) => {
    try {
      return await authService.sendCode(data);
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
export const verifyCode = createAsyncThunk("auth/verifyCode", async (code, thunkAPI) => {
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
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = '';
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
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('rejected');

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('logout fulfilled');

        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        console.log("verifyAccount fulfilled")
        return action.payload
      })
      .addCase(sendCode.fulfilled, (state, action) => {
        console.log("sendCode fulfilled")
        return action.payload
      })
      .addCase(sendCode.rejected, (state, action) => {
        return action.payload
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(verifyCode.rejected, (state, action) => {
        return action.payload
      })
      .addCase(DeleteAccount.pending, (state) => {
        console.log(' DeleteAccount pending');
        state.isLoading = true;
      })
      .addCase(DeleteAccount.fulfilled, (state) => {
        console.log('deleteAccount fulfilled');
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(DeleteAccount.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        console.log('updated pass rejected');
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        console.log('updated pass fulfilled');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = false;
        state.user = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log('updateUser rejected');
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("action")
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = false;
        state.user = null;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(resetUserPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
