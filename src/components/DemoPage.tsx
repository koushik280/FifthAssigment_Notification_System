import React, { useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import type { NotificationType } from '../types/notification';

const PRESETS = [
  { type: 'success' as const, title: 'Payment Done',   message: 'Transaction of $49.99 was successful.'        },
  { type: 'error'   as const, title: 'Upload Failed',  message: 'File exceeds 10 MB limit.'                    },
  { type: 'info'    as const, title: 'Update Ready',   message: 'Version 3.2.1 is ready to install.'           },
  { type: 'warning' as const, title: 'Storage Full',   message: 'You have used 92% of your storage quota.'     },
  { type: 'success' as const, title: 'Profile Saved',  message: 'Your profile changes were saved to cloud.'    },
  { type: 'error'   as const, title: 'Server Error',   message: 'Could not reach server. Retrying in 5s...'    },
];

const TYPE_COLORS: Record<NotificationType, string> = {
  success: 'border-green-800  bg-green-950  text-green-400',
  error:   'border-red-800    bg-red-950    text-red-400',
  info:    'border-blue-800   bg-blue-950   text-blue-400',
  warning: 'border-yellow-800 bg-yellow-950 text-yellow-400',
};

const DemoPage: React.FC = () => {
  const { success, error, info, warning, clear } = useNotification();
  const dispatch = { success, error, info, warning };

  const [type,        setType]        = useState<NotificationType>('info');
  const [title,       setTitle]       = useState('');
  const [message,     setMessage]     = useState('');
  const [autoDismiss, setAutoDismiss] = useState(true);
  const [duration,    setDuration]    = useState(4000);

  const fireCustom = () => {
    if (!message.trim()) return;
    dispatch[type]({ title: title || undefined, message, autoDismiss, duration });
    setMessage('');
    setTitle('');
  };

  const fireAll = () => {
    setTimeout(() => success({ title: 'Build Passed',  message: 'All 142 tests passed.' }),  0);
    setTimeout(() => warning({ title: 'High Memory',   message: 'Memory usage above 80%.' }), 200);
    setTimeout(() => info({    title: 'Deploy Done',   message: 'v4.1.0 is live.' }),          400);
    setTimeout(() => error({   title: 'DB Timeout',    message: 'Query exceeded 30s.' }),      600);
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-slate-950">

      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">
        Notification System
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        Redux Toolkit · React-Redux · Tailwind CSS · Auto-dismiss · Queue
      </p>

      
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-slate-200 font-semibold text-base mb-4">⚡ Quick Presets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => dispatch[p.type]({ title: p.title, message: p.message })}
              className={`rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${TYPE_COLORS[p.type]}`}
            >
              <div className="text-[10px] font-bold tracking-widest mb-1 uppercase">
                {p.type}
              </div>
              <div className="text-slate-200 text-xs font-semibold mb-0.5">{p.title}</div>
              <div className="text-slate-500 text-xs">{p.message}</div>
            </button>
          ))}
        </div>
      </section>

     
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-slate-200 font-semibold text-base mb-4">🔥 Stress Test</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={fireAll}
            className="px-4 py-2 rounded-lg text-sm font-semibold
                       bg-indigo-950 border border-indigo-800 text-indigo-400
                       hover:bg-indigo-900 transition-colors"
          >
            Fire All 4 Types
          </button>
          <button
            onClick={() => { for (let i = 0; i < 6; i++) setTimeout(() => info({ message: `Batch #${i + 1}` }), i * 150); }}
            className="px-4 py-2 rounded-lg text-sm font-semibold
                       bg-blue-950 border border-blue-800 text-blue-400
                       hover:bg-blue-900 transition-colors"
          >
            Fire 6 Rapid
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 rounded-lg text-sm font-semibold
                       bg-red-950 border border-red-800 text-red-400
                       hover:bg-red-900 transition-colors"
          >
            Clear All
          </button>
        </div>
      </section>

      
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-slate-200 font-semibold text-base mb-4">🛠 Custom Builder</h2>

        {/* Type pills */}
        <div className="flex gap-2 mb-4">
          {(['success', 'error', 'info', 'warning'] as NotificationType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
                ${type === t ? TYPE_COLORS[t] : 'border-slate-700 text-slate-500 bg-transparent hover:border-slate-500'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2
                       text-slate-200 text-sm placeholder-slate-600 outline-none
                       focus:border-indigo-600 transition-colors"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message *"
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2
                       text-slate-200 text-sm placeholder-slate-600 outline-none
                       focus:border-indigo-600 transition-colors"
          />

          {/* Auto-dismiss toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoDismiss}
              onChange={(e) => setAutoDismiss(e.target.checked)}
              className="accent-indigo-500 w-4 h-4"
            />
            <span className="text-slate-400 text-sm">Auto-dismiss</span>
          </label>

          {/* Duration slider */}
          {autoDismiss && (
            <div>
              <p className="text-[11px] text-slate-500 font-mono mb-1">
                DURATION: {duration}ms
              </p>
              <input
                type="range"
                min={1000} max={9000} step={500}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          )}

          {/* Fire button */}
          <button
            onClick={fireCustom}
            disabled={!message.trim()}
            className="sm:col-span-2 py-2 rounded-lg text-sm font-semibold
                       bg-indigo-600 hover:bg-indigo-500 text-white
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Fire Notification
          </button>
        </div>
      </section>

    </main>
  );
};

export default DemoPage;