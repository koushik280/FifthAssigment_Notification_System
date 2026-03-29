import React from "react";
import { useNotification } from "../hooks/useNotification";

const Sidebar: React.FC = () => {
  const { success, error, info, warning } = useNotification();

  const items = [
    {
      icon: "🏠",
      label: "Dashboard",
      fn: () =>
        info({ title: "Dashboard", message: "You are on the dashboard." }),
    },
    {
      icon: "📊",
      label: "Analytics",
      fn: () =>
        info({
          title: "Analytics",
          message: "Analytics module loaded successfully.",
        }),
    },
    {
      icon: "👥",
      label: "Users",
      fn: () =>
        warning({
          title: "Warning",
          message: "You have limited access to users.",
        }),
    },
    {
      icon: "⚙️",
      label: "Settings",
      fn: () =>
        success({ title: "Settings", message: "Settings are up to date." }),
    },
    {
      icon: "📁",
      label: "Files",
      fn: () =>
        error({
          title: "Load Error",
          message: "Could not load files. Try again.",
        }),
    },
  ];

  return (
    <aside
      className="w-52 shrink-0 bg-slate-900 border-r border-slate-800
                      flex flex-col gap-1 p-3"
    >
      <p className="text-[10px] font-bold tracking-widest text-slate-500 px-2 mb-2">
        NAVIGATION
      </p>

      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.fn}
          className="flex items-center gap-3 px-3 py-2 rounded-lg
                     text-slate-400 text-sm font-medium text-left w-full
                     hover:bg-indigo-500/10 hover:text-slate-200 transition-colors"
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* Tip box */}
      <div className="mt-auto p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
        <p className="text-[10px] font-bold text-indigo-400 tracking-wider mb-1">
          TIP
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Click any nav item to trigger a notification from the sidebar.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
