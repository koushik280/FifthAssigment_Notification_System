export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration: number;
  autoDismiss: boolean;
  timestamp: number;
}

export interface NotificationState {
  notifications: Notification[];
}
