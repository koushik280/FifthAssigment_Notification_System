import React from 'react';
import { useNotification } from '../hooks/useNotification';
import NotificationCard from './NotificationCard';

const NotificationList: React.FC = () => {
  const { notifications, clear } = useNotification();

  if (notifications.length === 0) return null;

  return (
    // Fixed position in the top-right — no portal needed
    <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">

      {/* Clear all — shown when 2 or more exist */}
      {notifications.length >= 2 && (
        <button
          onClick={clear}
          className="text-xs text-slate-400 hover:text-slate-200
                     bg-slate-800 hover:bg-slate-700
                     border border-slate-700 rounded-full
                     px-3 py-1 transition-colors"
        >
          Clear all ({notifications.length})
        </button>
      )}

      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
};

export default NotificationList;