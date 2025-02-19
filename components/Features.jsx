import React from 'react'
import { Car, Clock, Award} from 'lucide-react'

const Features = () => {
  return (
    <div>
                <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <Car className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Choose from a variety of cars to suit your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Rentals
              </h3>
              <p className="text-gray-600">
                Rent for hours, days, or weeks—your choice!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Exceptional Service
              </h3>
              <p className="text-gray-600">
                Our team is here to ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Features