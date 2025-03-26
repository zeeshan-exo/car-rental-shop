import CarForm from './carForm';
import DisplayVendorCars from './vendorCars';

export default async function ProductsPage() {

  return (
    <div className="p-4">
       <CarForm />
     <DisplayVendorCars/>
    </div>
  );
}
