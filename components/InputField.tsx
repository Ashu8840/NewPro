
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        required
      />
    </div>
  );
};
