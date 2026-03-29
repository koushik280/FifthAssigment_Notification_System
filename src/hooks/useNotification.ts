import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  addNotification,
  removeNotification,
  clearNotifications,
} from "../store/notificationSlice";
import type { NotificationType } from "../types/notification";

type Options = {
  title?: string;
  message: string;
  duration?: number;
  autoDismiss?: boolean;
};

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notifications.notifications);

  const notify = (type: NotificationType, opts: Options) => {
    dispatch(
      addNotification({
        type,
        title: opts.title ?? type.charAt(0).toUpperCase() + type.slice(1),
        message: opts.message,
        duration: opts.duration,
        autoDismiss: opts.autoDismiss,
      }),
    );
  };

  return {
    notifications,
    success: (opts: Options) => notify("success", opts),
    error: (opts: Options) => notify("error", opts),
    info: (opts: Options) => notify("info", opts),
    warning: (opts: Options) => notify("warning", opts),
    remove: (id: string) => dispatch(removeNotification(id)),
    clear: () => dispatch(clearNotifications()),
  };
};
