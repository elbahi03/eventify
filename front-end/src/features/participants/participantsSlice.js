// participantsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// POST /participants
export const addParticipant = createAsyncThunk(
  "participants/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/participants`, data);
      // controller retourne { message, participant }
      return res.data.participant;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /participants/event/{eventId}  (protégé selon tes routes)
export const fetchParticipantsByEvent = createAsyncThunk(
  "participants/fetchByEvent",
  async ({ eventId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.get(`${API_BASE}/participants/event/${eventId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// DELETE /participants/{id}  (protégé)
export const deleteParticipant = createAsyncThunk(
  "participants/delete",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      await axios.delete(`${API_BASE}/participants/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// POST /participants/verify
export const verifyParticipant = createAsyncThunk(
  "participants/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/participants/verify`, data);
      // controller retourne { message, participant } si trouvé
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    participant: null,
    loading: false,
    error: null,
    lastUpdate: null
  },
  reducers: {
    clearParticipants(state) {
      state.participants = [];
    },
    clearParticipant(state) {
      state.participant = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipantsByEvent.fulfilled, (state, action) => {
        state.participants = action.payload;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        // push nouvel participant (si on a déjà la liste d'un event)
        state.participants.push(action.payload);
        state.participant = action.payload;
      })
      .addCase(deleteParticipant.fulfilled, (state, action) => {
        state.participants = state.participants.filter((p) => p.id !== action.payload);
        if (state.participant?.id === action.payload) state.participant = null;
      })
      .addCase(verifyParticipant.fulfilled, (state, action) => {
        // action.payload contient { message, participant } d'après ton controller
        state.participant = action.payload.participant ?? null;
      });

    // Generic matchers
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("participants/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("participants/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("participants/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error?.message;
        }
      );
  },
});

export const { clearParticipants, clearParticipant, clearError } = participantsSlice.actions;
export const selectAllParticipants = (state) => state.participants.participants;
export const selectCurrentParticipant = (state) => state.participants.participant;
export const selectParticipantsLoading = (state) => state.participants.loading;
export const selectParticipantsError = (state) => state.participants.error;
export default participantsSlice.reducer;
