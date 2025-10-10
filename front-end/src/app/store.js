import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/events/eventsSlice";
import participantsReducer from "../features/participants/participantsSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    participants: participantsReducer,
    auth: authReducer,
  },
});

export default store;
