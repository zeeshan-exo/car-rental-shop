"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { updateBio } from "@/actions/users";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { User, MapPin, FileText, Calendar } from "lucide-react";

const formFields = [
  {id:"age", label: "Age", icon: Calendar, type: "number", placeholder:"Enter your age", required: true, min: 18, component: "input" },
  {id:"country", label: "Country", icon: MapPin, type: "text", placeholder:"country", required: false, component: "input" },
  {id:"bio", label: "Bio", icon: FileText, placeholder:"Let others know a bit about you (max 250 characters)", rows:3,  required: false, component: "textarea" }
]

const BioForm = () => {
  const [state, formAction] = useActionState(updateBio, { errors: {}, success: false });

  return (
    <form action={formAction} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {state.success ? (
        <p className="bg-green-100 text-green-700 text-sm p-4 mb-4 rounded-xl">
          Profile updated successfully!
        </p>
      ) : (
        <div className="bg-red-100 text-AppDanger text-sm p-4 mb-4 rounded-xl">
          {state.errors?.form ? (
            <p>{state.errors.form.join(", ")}</p>
          ) : (
            <p>{"You haven't completed your profile info yet."}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field)=> (
            <div key={field.id} className="space-y-2">
              <div className="flex items-center gap-2">
              <field.icon size={18} className="text-AppDark" />
              <Label htmlFor={field.id}>{field.label}</Label>
              </div>
              {field.component === "input" ? (
                <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                min={field.min}
                />
              ):(
                <Textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                rows={field.rows}
                
                />
              )}
              
            {state.errors?.[field.id] && (
              <p className="text-sm text-red-500">{state.errors[field.id]}</p>
            )}
            </div>
        ))}    
      </div>

      <Button type="submit" className="w-full bg-AppPrimary text-white py-3 mt-6">
        Save Profile
      </Button>
    </form>
  );
};

export default BioForm;