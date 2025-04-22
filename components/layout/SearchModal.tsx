"use client"
import React, { ChangeEvent, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, CarIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { searchQuery } from "@/actions/search";
import Loading from "../shared/Loading";

interface SearchResult {
  id: string;
  carName?: string;
  brand?: string;
  city?: string;
  year?: number;
  price?: number;
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const performSearch = useCallback(async () => {
    if (!inputValue) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchQuery(inputValue);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Unable to fetch search results. Please try again.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue && isOpen) {
      performSearch();
    }
  }, [inputValue, isOpen, performSearch]);

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
      return (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin h-6 w-6 border-t-2 border-AppPrimary rounded-full"></div>
          <span className="ml-2 text-gray-500">Searching...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md flex items-center">
          <X className="h-5 w-5 mr-2" />
          {error}
        </div>
      );
    }

    if (!results || results.cars.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          <Search className="h-10 w-10 mx-auto mb-2 text-gray-300" />
          <p>No results found. Try a different search term.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-2 flex items-center">
          <CarIcon className="h-5 w-5 mr-2 text-AppPrimary" />
          Search Results
        </h4>
        <ul className="space-y-2">
          {results.cars.map((car) => (
            <li 
              key={car.id} 
              onClick={() => handleCarClick(car.id)}
              className="bg-AppLight border rounded-lg p-3 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 group-bg-AppPrimaryHover">
                    {car.carName}
                  </h3>
                  <div className="flex items-center text-AppDark text-sm space-x-2">
                    <span>{car.brand}</span>
                    <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {car.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {car.year && (
                    <Badge variant="secondary" className="text-xs">
                      {car.year}
                    </Badge>
                  )}
                  {car.price && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      ${car.price.toLocaleString()}
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card 
        ref={modalRef}
        className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto animate-fade-in"
      >
        <CardHeader className="flex flex-row justify-between items-center border-b pb-3">
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-AppPrimary" />
            Search Cars
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="pt-4">
          <CardDescription className="mb-4">Find your perfect car</CardDescription>
          
          <div className="flex space-x-2 mb-4">
            <Input
              type="search"
              placeholder="Search by car name, brand, or city"
              value={inputValue || ""}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              autoFocus
              className="flex-grow"
            />
            <Button 
              onClick={handleSearch} 
              disabled={!inputValue}
              
              className="flex items-center text-AppLight bg-AppPrimary hover:bg-AppPrimaryHover"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {renderSearchResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchModal;