import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  NotificationState,
  NotificationType,
} from "../types/notification";

const initialState: NotificationState = {
  notifications: [],
};

type AddPayload = {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  autoDismiss?: boolean;
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AddPayload>) => {
      const {
        type,
        title,
        message,
        duration = 4000,
        autoDismiss = true,
      } = action.payload;

      // Keep max 5 in queue
      if (state.notifications.length >= 5) {
        state.notifications.shift();
      }

      state.notifications.push({
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        type,
        title,
        message,
        duration,
        autoDismiss,
        timestamp: Date.now(),
      });
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
