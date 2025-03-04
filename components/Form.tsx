import React, { useState } from "react";
import { Button } from "./ui/button";

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  initialValues?: Record<string, string>;
  errors?: Record<string, string>;
  pending?: boolean;
}

export default function ReusableForm({
  fields,
  onSubmit,
  initialValues = {},
  errors = {},
  pending = false,
}: ReusableFormProps) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, placeholder, icon, required }) => (
        <div key={name} className="relative">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {icon}
            </span>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              required={required}
              disabled={pending}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                errors[name] ? "border-red-300" : "border-gray-300"
              }   transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
          </div>
          {errors[name] && (
            <p className="mt-1 text-red-600 text-sm">{errors[name]}</p>
          )}
        </div>
      ))}

      <div className="pt-2 flex items-center justify-between">
        <a
          href="/terms"
          className="text-sm text-sky-600 hover:underline"
        >
          Terms & Conditions
        </a>
        <Button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-sky-400 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}