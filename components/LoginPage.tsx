
import React from 'react';
import { InputField } from './InputField';
import { GoogleButton } from './GoogleButton';
import { LogoIcon } from './icons';

interface LoginPageProps {
  onToggleView: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onToggleView }) => {
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    alert('Login functionality not implemented.');
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex flex-col items-center mb-6">
        <LogoIcon className="w-12 h-12 mb-2 text-indigo-400" />
        <h1 className="text-2xl font-bold text-slate-200">Welcome Back</h1>
        <p className="text-slate-400">Please enter your details to login</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField id="login-email" label="Email" type="email" placeholder="you@example.com" />
        <InputField id="login-password" label="Password" type="password" placeholder="••••••••" />
        <div className="text-right">
          <a href="#" className="text-sm text-indigo-400 hover:underline">Forgot Password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-slate-600"></div>
        <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
        <div className="flex-grow border-t border-slate-600"></div>
      </div>
      <GoogleButton text="Login with Google" />
      <p className="text-center text-sm text-slate-400 mt-8">
        Don't have an account?{' '}
        <button onClick={onToggleView} className="font-semibold text-indigo-400 hover:underline focus:outline-none">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
