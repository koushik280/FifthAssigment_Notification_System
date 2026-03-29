import React, { useEffect, useRef, useState } from "react";
import type { Notification } from "../types/notification";
import { useNotification } from "../hooks/useNotification";

interface Props {
  notification: Notification;
}

// Tailwind classes per type
const TYPE_STYLES = {
  success: {
    wrapper:
      "bg-green-950 border border-green-800 border-l-4 border-l-green-500",
    icon: "bg-green-900 text-green-400",
    label: "text-green-400",
    bar: "bg-green-500",
    iconSymbol: "✓",
    labelText: "SUCCESS",
  },
  error: {
    wrapper: "bg-red-950 border border-red-800 border-l-4 border-l-red-500",
    icon: "bg-red-900 text-red-400",
    label: "text-red-400",
    bar: "bg-red-500",
    iconSymbol: "✕",
    labelText: "ERROR",
  },
  info: {
    wrapper: "bg-blue-950 border border-blue-800 border-l-4 border-l-blue-500",
    icon: "bg-blue-900 text-blue-400",
    label: "text-blue-400",
    bar: "bg-blue-500",
    iconSymbol: "i",
    labelText: "INFO",
  },
  warning: {
    wrapper:
      "bg-yellow-950 border border-yellow-800 border-l-4 border-l-yellow-500",
    icon: "bg-yellow-900 text-yellow-400",
    label: "text-yellow-400",
    bar: "bg-yellow-500",
    iconSymbol: "!",
    labelText: "WARNING",
  },
} as const;

const NotificationCard: React.FC<Props> = ({ notification }) => {
  const { remove } = useNotification();
  const { id, type, title, message, duration, autoDismiss } = notification;
  const styles = TYPE_STYLES[type];

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const pausedAtRef = useRef<number | null>(null);

  // Entry animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  // Auto-dismiss countdown
  useEffect(() => {
    if (!autoDismiss) return;

    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(intervalRef.current!);
        remove(id);
      }
    }, 30);

    return () => clearInterval(intervalRef.current!);
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      pausedAtRef.current = Date.now();
    }
  };

  // Resume on mouse leave
  const handleMouseLeave = () => {
    if (pausedAtRef.current !== null && autoDismiss) {
      startRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startRef.current;
        const pct = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(pct);
        if (pct <= 0) {
          clearInterval(intervalRef.current!);
          remove(id);
        }
      }, 30);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative w-80 rounded-xl overflow-hidden shadow-2xl cursor-default
        transition-all duration-500 ease-out
        ${styles.wrapper}
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}
      `}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div
          className={`
          w-8 h-8 rounded-lg flex items-center justify-center
          text-sm font-bold shrink-0 mt-0.5
          ${styles.icon}
        `}
        >
          {styles.iconSymbol}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold tracking-widest ${styles.label}`}
            >
              {styles.labelText}
            </span>
            <span className="text-sm font-semibold text-slate-100 truncate">
              {title}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={() => remove(id)}
          className="text-slate-500 hover:text-slate-200 hover:bg-white/10
                     transition-colors rounded p-1 text-xs leading-none shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      {autoDismiss && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className={`h-full transition-none ${styles.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
