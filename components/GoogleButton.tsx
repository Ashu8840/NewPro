
import React from 'react';
import { GoogleIcon } from './icons';

interface GoogleButtonProps {
    text: string;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ text }) => {
    
  const handleGoogleLogin = () => {
    // In a real app, you would initiate the Google OAuth flow here.
    alert('Google login functionality not implemented.');
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <GoogleIcon className="w-5 h-5" />
      <span>{text}</span>
    </button>
  );
};
