import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchMessages = createAsyncThunk(
  'chat/fetchmessage',
  async (receiver, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/chat/${receiver}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (sender,receiver,content, { rejectWithValue }) => {
    try {
      // const response = await axios.post(
      //   `${API_URL}/chat/:id/messages`,msgDetails,{
      //     withCredentials: true
          
      //   });
      const response = await  axios.post(
        `${API_URL}/chat/messages`,
        { sender, receiver, content },
        { headers: { 'Content-Type': 'application/json' } }
      );
       
        // {  }
      
        console.log(sender,receiver,content,"msgDetails") // Returns the message data
      return response.data;
      console.log( response.data)
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error sending message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    loading: false,
    messages: [],
    error: null,
  },
  reducers: {
    resetChatState: (state) => {
      state.messages = [];
      state.error = null;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { resetChatState, addMessage } = chatSlice.actions;

export default chatSlice.reducer;



