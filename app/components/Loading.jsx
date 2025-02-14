import React from 'react'

const Loading = () => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default Loading