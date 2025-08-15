import React, { useState, useCallback, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

const App: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // In a real app, you'd store this token securely (e.g., localStorage)
      // and update the application state to reflect that the user is logged in.
      alert('Successfully logged in with Google!');
      console.log('Received token:', token);
      // Clean the token from the URL for a better user experience
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const toggleView = useCallback(() => {
    setIsLoginView(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md">
        {isLoginView ? <LoginPage onToggleView={toggleView} /> : <SignUpPage onToggleView={toggleView} />}
      </div>
    </div>
  );
};

export default App;