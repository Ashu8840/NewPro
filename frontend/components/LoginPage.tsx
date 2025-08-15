import React, { useState } from 'react';
import { InputField } from './InputField';
import { GoogleButton } from './GoogleButton';
import { LogoIcon } from './icons';

interface LoginPageProps {
  onToggleView: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      // In a real app, you would store the token and manage auth state.
      console.log('Login successful, token:', data.token);
      alert('Login successful!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex flex-col items-center mb-6">
        <LogoIcon className="w-12 h-12 mb-2 text-indigo-400" />
        <h1 className="text-2xl font-bold text-slate-200">Welcome Back</h1>
        <p className="text-slate-400">Please enter your details to login</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <InputField id="login-email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField id="login-password" label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
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
