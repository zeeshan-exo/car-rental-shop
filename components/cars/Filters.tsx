"use client";
import React, { useMemo } from "react";
import { 
  Car, 
  MapPin, 
  DollarSign, 
  CheckCircle2,
  Settings,
  Fuel,
  DivideCircleIcon
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { formatCurrency } from "@/lib/currency";

type FiltersProps = {
  cars: any[];
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  clearFilters: () => void;
};

export default function Filters({ 
  cars, 
  filters, 
  setFilters, 
  clearFilters,
}: FiltersProps) {


  const filterOptions = useMemo(() => {
   
    const rentalRates = cars.map(car => car.rentalRate).filter(Boolean);
    const minRate = Math.min(...rentalRates);
    const maxRate = Math.max(...rentalRates);

    return {
      brands: Array.from(new Set(cars.map((car) => car.brand))).filter(Boolean).sort(),
      
      cities: Array.from(new Set(cars.map((car) => car.city))).filter(Boolean).sort(),
      
      fuelTypes: Array.from(
        new Set(cars.map((car) => car?.details?.specs?.fuelType))
      ).filter(Boolean).sort(),
      
      transmissions: Array.from(
        new Set(cars.map((car) => car?.details?.specs?.transmission))
      ).filter(Boolean).sort(),
      
      availabilityStatus: Array.from(
        new Set(cars.map((car) => car.isAvailable))
      ).filter(Boolean),
      
      rentalRates: {
        min: minRate,
        max: maxRate,
        current: filters.maxRate || maxRate
      }
    };
  }, [cars, filters.maxRate]);

  const handleCheckboxChange = (
    filterKey: string,
    value: any,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const currentValues = prev[filterKey] ? [...prev[filterKey]] : [];
      
      if (checked) {
        return { ...prev, [filterKey]: [...currentValues, value] };
      } else {
        return {
          ...prev,
          [filterKey]: currentValues.filter((v) => v !== value),
        };
      }
    });
  };

  const handleRateChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      maxRate: value[0]
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-1">Filter</h2>
      <hr className="border-AppDark mb-4"/>
          <div className="text-sm font-medium flex items-center gap-2 py-2">
            <span>Rent Range</span>
          </div>
          <div>
            <div className="px-1 pt-4 pb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>min ~{formatCurrency(filterOptions.rentalRates.min)}</span>
                <span>max ~{formatCurrency(filterOptions.rentalRates.max)}</span>
              </div>
              <Slider
                defaultValue={[filters.maxRate || filterOptions.rentalRates.max]}
                max={filterOptions.rentalRates.max}
                min={filterOptions.rentalRates.min}
                step={100}
                onValueChange={handleRateChange}
              />
              {/* <div className="mt-2 text-sm text-center">
                Max: {formatCurrency(filterOptions.rentalRates.max)}
              </div> */}
            </div>
            <hr></hr>
            </div>


       
          <div className="text-md font-medium flex items-center gap-2 py-2">
            <Car className="h-4 w-4" /> 
            <span className="">Brand</span>
          </div>

            <div className="space-y-2 px-1 py-2 text-AppDark">
              {filterOptions.brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands?.includes(brand) || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("brands", brand, checked as boolean)
                    }
                  />
                  <Label htmlFor={`brand-${brand}`} className="capitalize">{brand}</Label>
                </div>
              ))}
              {filterOptions.brands.length === 0 && (
                <p className="text-sm text-gray-500">No brands available</p>
              )}
            </div>
            <hr className="border-gray-300"/>

          <div className="text-md font-medium flex items-center gap-2 py-2">
            <MapPin className="h-4 w-4" /> 
            <span>Location</span>
          </div>
          <div>
            <div className="space-y-2 px-1 py-2 text-AppDark">
              {filterOptions.cities.map((city) => (
                <div key={city} className="flex items-center gap-2">
                  <Checkbox
                    id={`city-${city}`}
                    checked={filters.cities?.includes(city) || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("cities", city, checked as boolean)
                    }
                  />
                  <Label htmlFor={`city-${city}`}>{city}</Label>
                </div>
              ))}
              {filterOptions.cities.length === 0 && (
                <p className="text-md text-gray-500">No locations available</p>
              )}
            </div>
          </div>
          <hr className="border-gray-300"/>

        <div>
          <div className="text-md font-medium flex items-center gap-2 py-2">
            <Fuel className="h-4 w-4" /> 
            <span>Fuel Type</span>
          </div>
            <div className="space-y-2 px-1 py-2 text-AppDark">
              {filterOptions.fuelTypes.map((fuel) => (
                <div key={fuel} className="flex items-center gap-2">
                  <Checkbox
                    id={`fuel-${fuel}`}
                    checked={filters.fuelType?.includes(fuel) || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("fuelType", fuel, checked as boolean)
                    }
                  />
                  <Label htmlFor={`fuel-${fuel}`}>{fuel}</Label>
                </div>
              ))}
              {filterOptions.fuelTypes.length === 0 && (
                <p className="text-sm text-gray-500">No fuel types available</p>
              )}
            </div>
          </div>
          <hr className="border-gray-300"/>


        <div>
          <div className="text-md font-medium flex items-center gap-2 py-2">
            <Settings className="h-4 w-4" /> 
            <span>Transmission</span>
          </div>

            <div className="space-y-2 px-1 py-2 text-AppDark">
              {filterOptions.transmissions.map((transmission) => (
                <div key={transmission} className="flex items-center gap-2">
                  <Checkbox
                    id={`transmission-${transmission}`}
                    checked={filters.transmission?.includes(transmission) || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("transmission", transmission, checked as boolean)
                    }
                  />
                  <Label htmlFor={`transmission-${transmission}`}>{transmission}</Label>
                </div>
              ))}
              {filterOptions.transmissions.length === 0 && (
                <p className="text-sm text-gray-500">No transmission types available</p>
              )}
            </div>
          </div>
          {/* <hr className="border-gray-300"/> */}

    </div>
  );
}