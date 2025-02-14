import React, { useState } from "react";

export default function ReusableForm({ title="form", fields, onSubmit, initialValues = {}, errors = {}, pending = false }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
    <h1 className="text-2xl items-center text-center  font-bold mb-2 flex flex-1">{title}</h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg">
      
      {fields.map(({label, name, type, placeholder }) => (
       
        <div key={name} className={`flex flex-col ${type === "textarea" ? "col-span-3" : ""}`}>
          <label htmlFor={name} className="font-semibold mb-1">
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              rows={3}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
            />
          )}
          {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <div className="col-span-3 mt-4 flex justify-between">
      <p className="text-sky-600 text-sm hover:underline">Terms & Conditions</p>
        <button
          disabled={pending}
          type="submit"
          className="bg-sky-500 text-white p-2 font-bold rounded-md disabled:bg-slate-500"
        >
          {pending ? "Submitting..." : "Book"}
        </button>
      
      </div>
    </form>
    </div>
  );
}
