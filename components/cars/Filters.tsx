"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";

interface FilterField {
  key: string;
  label: string;
  options: { value: string | number; label: string }[];
}

interface FilterProps {
  filterFields: FilterField[];
  onFilterChange: (filters: Record<string, string | number>) => void;
}

const FilterModal: React.FC<FilterProps> = ({ filterFields, onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" /> Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 w-80 h-full fixed right-0 bg-AppLight shadow-lg">
        <DrawerHeader>
          <DrawerTitle>Filter By:</DrawerTitle>
          <DrawerDescription>Filter Cars which suits you best.
          </DrawerDescription>
        </DrawerHeader>
        {filterFields.map((field) => (
          <div key={field.key} className="mb-4">
            <label className="text-sm font-medium block mb-2">{field.label}</label>
            <Select onValueChange={(value) => handleChange(field.key, value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
        <DialogClose asChild>
        <Button className="mt-4 w-full bg-AppAccent hover:bg-amber-600" onClick={() => setIsOpen(false)}>
          Apply
        </Button>
        </DialogClose>

      </DrawerContent>
    </Drawer>
  );
};

export default FilterModal;
