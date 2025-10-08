// eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// ---------- Thunks (tous les endpoints) ----------

// GET /events
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/events`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/{id}
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/events/${id}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/user/{userId}  (protégé)
export const fetchEventsByUser = createAsyncThunk(
  "events/fetchByUser",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.get(`${API_BASE}/events/user/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/categorie/{categorie}
export const fetchEventsByCategory = createAsyncThunk(
  "events/fetchByCategory",
  async (categorie, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_BASE}/events/categorie/${encodeURIComponent(categorie)}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/search/{title}  (search by type/title)
export const searchByType = createAsyncThunk(
  "events/searchByType",
  async (type, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/events/search/${encodeURIComponent(type)}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/search/date-local  (avec query params ?date=YYYY-MM-DD&location=...)
export const searchByDateOrLocation = createAsyncThunk(
  "events/searchByDateOrLocation",
  async ({ date, location }, { rejectWithValue }) => {
    try {
      // Le controller attend Request (date et/ou location) — on envoie en query params.
      const res = await axios.get(`${API_BASE}/events/search/date-local`, {
        params: { date, location },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// GET /events/aleatoire
export const randomEvents = createAsyncThunk(
  "events/random",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/events-aleatoire`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// POST /events  (protégé)
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.post(`${API_BASE}/events`, eventData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // controller retourne { message, event }
      return res.data.event;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// PUT /events/{id}  (protégé)
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.put(`${API_BASE}/events/${id}`, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // controller retourne { message, event }
      return res.data.event;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// DELETE /events/{id}  (protégé)
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      await axios.delete(`${API_BASE}/events/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// ---------- Slice ----------
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    event: null,
    loading: false,
    error: null,
    lastUpdate: null,
    filters: {        
        category: null,
        date: null,
        location: null
      }
  },
  reducers: {
    // si besoin : clearError, clearEvent...
    clearEvent(state) {
      state.event = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Specific handlers
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(fetchEventsByUser.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(searchByType.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(searchByDateOrLocation.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(randomEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        // ajouter nouvel event (au début)
        state.events.unshift(action.payload);
        state.event = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const updated = action.payload;
        state.events = state.events.map((e) => (e.id === updated.id ? updated : e));
        if (state.event?.id === updated.id) state.event = updated;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
        if (state.event?.id === action.payload) state.event = null;
      });

    // Generic matchers for pending / rejected for this slice
    builder
      .addMatcher(
        (action) => action.type.startsWith("events/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("events/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("events/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error?.message;
        }
      );
  },
});

export const { clearEvent, clearError } = eventsSlice.actions;
export const selectAllEvents = (state) => state.events.events;
export const selectCurrentEvent = (state) => state.events.event;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export default eventsSlice.reducer;
