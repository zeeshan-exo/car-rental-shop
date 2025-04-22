import CarForm from './CarForm';
import DisplayVendorCars from './vendorCars';

export default async function CarsPage() {

  return (
    <div className="p-4">
       <CarForm />
     <DisplayVendorCars/>
    </div>
  );
}
