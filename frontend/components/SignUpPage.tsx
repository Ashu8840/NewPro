import React, { useState } from 'react';
import { InputField } from './InputField';
import { GoogleButton } from './GoogleButton';
import { LogoIcon } from './icons';

interface SignUpPageProps {
  onToggleView: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onToggleView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }
      // In a real app, you would store the token and manage auth state.
      console.log('Registration successful, token:', data.token);
      alert('Account created successfully! Please log in.');
      onToggleView(); // Switch to login view
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex flex-col items-center mb-6">
        <LogoIcon className="w-12 h-12 mb-2 text-indigo-400" />
        <h1 className="text-2xl font-bold text-slate-200">Create an Account</h1>
        <p className="text-slate-400">Join us and start your journey</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <InputField id="signup-name" label="Full Name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
        <InputField id="signup-email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField id="signup-password" label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        <InputField id="signup-confirm-password" label="Confirm Password" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Account
        </button>
      </form>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-slate-600"></div>
        <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
        <div className="flex-grow border-t border-slate-600"></div>
      </div>
      <GoogleButton text="Sign Up with Google" />
      <p className="text-center text-sm text-slate-400 mt-8">
        Already have an account?{' '}
        <button onClick={onToggleView} className="font-semibold text-indigo-400 hover:underline focus:outline-none">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUpPage;
