// App.js
import React from 'react';
import useFetch from './hooks/useFetch';

const App = () => {
  // Using the custom hook
  const { data: products, loading, error } = useFetch('https://api.escuelajs.co/api/v1/products');

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse">Loading Products...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // Data Display
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Product Showcase
        </h1>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.slice(0, 20).map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                />
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 truncate mb-2" title={product.title}>
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;