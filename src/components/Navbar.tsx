import React from 'react';
import { useNotification } from '../hooks/useNotification';

const Navbar: React.FC = () => {
  const { notifications, success, error } = useNotification();
  const count = notifications.length;

  return (
    <nav className="w-full h-14 bg-slate-900 border-b border-slate-800
                    flex items-center justify-between px-6 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600
                        flex items-center justify-center text-sm">
          ⚡
        </div>
        <span className="text-slate-100 font-bold text-base tracking-tight">
          NotifyOS
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => success({ title: 'Saved!', message: 'Your changes have been saved.' })}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold
                     bg-green-950 border border-green-800 text-green-400
                     hover:bg-green-900 transition-colors"
        >
          Quick Save
        </button>

        <button
          onClick={() => error({ title: 'Auth Failed', message: 'Session expired. Please log in again.' })}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold
                     bg-red-950 border border-red-800 text-red-400
                     hover:bg-red-900 transition-colors"
        >
          Simulate Error
        </button>

        {/* Bell with badge */}
        <div className="relative">
          <span className={`text-xl ${count > 0 ? 'brightness-125' : 'grayscale'}`}>🔔</span>
          {count > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4
                            bg-red-500 text-white text-[10px] font-bold
                            rounded-full flex items-center justify-center
                            border-2 border-slate-900">
              {count > 9 ? '9+' : count}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;