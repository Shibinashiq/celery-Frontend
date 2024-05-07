
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'


const Store = configureStore({
  reducer: authReducer,

});

export default Store;
