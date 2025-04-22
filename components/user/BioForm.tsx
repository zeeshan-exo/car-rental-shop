"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { updateBio } from "@/actions/users";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { User, MapPin, FileText, Calendar } from "lucide-react";
import deleteUser from "@/actions/users";

const formFields = [
  {label: "Age", icon: User},
  {label: "Country", icon: MapPin, },
  {label: "Date", icon: Calendar, },
  {label: "Bio", icon: MapPin, },
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <Label htmlFor="age" className="font-medium">
              Age
            </Label>
          </div>
          <Input id="age" name="age" type="number" min={18} placeholder="Enter your age" required />
          {state.errors?.age && <p className="text-sm text-red-500">{state.errors.age}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-500" />
            <Label htmlFor="country" className="font-medium">
              Country
            </Label>
          </div>
          <Input id="country" name="country" type="text" placeholder="Enter your country" />
          {state.errors?.country && <p className="text-sm text-red-500">{state.errors.country}</p>}
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-gray-500" />
          <Label htmlFor="bio" className="font-medium">
            Bio
          </Label>
        </div>
        <Textarea id="bio" name="bio" rows={4} placeholder="Tell us about yourself..." />
        <p className="text-sm text-gray-500">Let others know a bit about you (max 250 characters)</p>
        {state.errors?.bio && <p className="text-sm text-red-500">{state.errors.bio}</p>}
      </div>

      {/* <div>
        <div>
            <Label htmlFor="image">Upload Image</Label>
        </div>
        <Input type="file" id="image" name="image"/>
      </div> */}

      <Button type="submit" className="w-full bg-AppPrimary text-white py-3 mt-6">
        Save Profile
      </Button>
    </form>
  );
};

export default BioForm;