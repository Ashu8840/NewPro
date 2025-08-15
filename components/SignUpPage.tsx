
import React from 'react';
import { InputField } from './InputField';
import { GoogleButton } from './GoogleButton';
import { LogoIcon } from './icons';

interface SignUpPageProps {
  onToggleView: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onToggleView }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    alert('Sign Up functionality not implemented.');
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex flex-col items-center mb-6">
        <LogoIcon className="w-12 h-12 mb-2 text-indigo-400" />
        <h1 className="text-2xl font-bold text-slate-200">Create an Account</h1>
        <p className="text-slate-400">Join us and start your journey</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField id="signup-name" label="Full Name" type="text" placeholder="John Doe" />
        <InputField id="signup-email" label="Email" type="email" placeholder="you@example.com" />
        <InputField id="signup-password" label="Password" type="password" placeholder="••••••••" />
        <InputField id="signup-confirm-password" label="Confirm Password" type="password" placeholder="••••••••" />
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
