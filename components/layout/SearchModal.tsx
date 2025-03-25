"use client"
import React, { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { searchQuery } from "@/actions/search";

interface SearchResult {
  id: string;
  carName?: string;
  brand?: string;
  city?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: string;
  onCarSelect?: (carId: string) => void;
}

const SearchModal = ({
  defaultValue = "",
  isOpen,
  onClose,
  onCarSelect
}: SearchModalProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(defaultValue);
  const [results, setResults] = useState<{cars: SearchResult[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue && isOpen) {
      performSearch();
    }
  }, [inputValue, isOpen]);

  const performSearch = async () => {
    if (!inputValue) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchQuery(inputValue);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("An error occurred while searching");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSearch = () => {
    if (inputValue) {
      router.push(`?q=${encodeURIComponent(inputValue)}`);
      performSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCarClick = (carId: string) => {
    if (onCarSelect) {
      onCarSelect(carId);
    }
    onClose();
  };

  const renderSearchResults = () => {
    if (isLoading) {
      return <p className="text-gray-500">Searching...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (!results || (results.cars.length === 0)) {
      return <p className="text-gray-500">No results found</p>;
    }

    return (
      <div className="space-y-4">
        {results.cars.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Cars</h4>
            <ul className="space-y-1">
              {results.cars.map((car) => (
                <li 
                  key={car.id} 
                  onClick={() => handleCarClick(car.id)}
                  className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {car.carName} - {car.brand} (${car.city})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Search
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardTitle>
          <CardDescription>Search for cars</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search cars"
              value={inputValue || ""}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              autoFocus
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={!inputValue}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
        <CardContent>
          {renderSearchResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchModal;