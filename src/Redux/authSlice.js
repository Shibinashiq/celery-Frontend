import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadState() || {
  isLoggedIn: false,
  userId: null,
  username: null,
  access: null,
  refresh: null,
  is_superuser: false, 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { userId, username, access, refresh, is_superuser } = action.payload; 
      state.isLoggedIn = true;
      state.userId = userId;
      state.access = access;
      state.username = username;
      state.refresh = refresh;
      state.is_superuser = is_superuser; 
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.access = null;
      state.username = null;
      state.is_superuser = false; 
      localStorage.removeItem('authState');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
