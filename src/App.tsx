import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DemoPage from './components/DemoPage';
import NotificationList from './components/NotificationList';

const App: React.FC = () => (
  <Provider store={store}>
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden">

      {/* Navbar — fires notifications globally */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — fires notifications globally */}
        <Sidebar />

        {/* Main content area */}
        <DemoPage />
      </div>

      {/*
        NotificationList uses fixed positioning internally.
        No portal — it sits here in the tree but renders
        visually on top via z-50 + fixed top-5 right-5.
      */}
      <NotificationList />

    </div>
  </Provider>
);

export default App;