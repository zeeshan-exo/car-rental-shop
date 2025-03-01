import PieChartWithCustomizedLabel from "@/components/PieChart"
import { Button } from "@/components/ui/button"
const page = () => {
  return (
    <div className="bg-AppSecondary h-full">
     <div className="grid grid-flow-row grid-cols-3 gap-4 p-6 h-screen w-full  justify-center">

      <div className="flex col-span-3 bg-AppTertiary h-full rounded-2xl p-4 gap-6">
          <div>
            <h2 className="font-semibold text-2xl">Total Car Rented</h2>
            <div>
              <p className="text-2xl font-semibold">18,531</p>
              <p><span className="text-2xl text-green-700 font-semibold">40%</span> from last week</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Total Car Rented</h2>
            <div>
            <p className="text-2xl font-semibold">18,531</p>
            <p><span className="text-2xl text-green-700 font-semibold">40%</span> from last week</p>
            </div>
          </div>
      </div>
      <div className="col-span-2 p-4 rounded-2xl bg-AppPrimary ">
           <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Cars Data </h2>
            <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">weekly</Button>
            <Button variant="outline" className="rounded-full">monthly</Button>
            <Button variant="outline" className="rounded-full">yearly</Button>
            </div>

           </div>
           <PieChartWithCustomizedLabel/>
      </div>
  
             <div className="row-span-2">
             <div 
              className="h-full w-full bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
              />
             </div>
  
             <div className=" rounded-2xl bg-AppTertiary">
               <p>welccome</p>
             </div>

             <div className=" rounded-2xl bg-AppPrimary">
             
             </div>

    </div>
    </div>

  )
}

export default page