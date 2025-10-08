import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/events/eventsSlice";
import participantsReducer from "../features/participants/participantsSlice";


 const store = configureStore({
  reducer: {
    events: eventsReducer,
    participants: participantsReducer,
  },
});

export default store
