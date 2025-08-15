
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

const App: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = useCallback(() => {
    setIsLoginView(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md">
        {isLoginView ? <LoginPage onToggleView={toggleView} /> : <SignUpPage onToggleView={toggleView} />}
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>This is a frontend-only demonstration. No real authentication is performed.</p>
        <p>Credentials and backend logic are not implemented.</p>
      </footer>
    </div>
  );
};

export default App;
