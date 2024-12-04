import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/UserSlice'; 
import chatReducer from '../Redux/ChatSlice'
const store = configureStore({
  reducer: {
    user: userReducer, 
    chat: chatReducer
  },
});

export default store;