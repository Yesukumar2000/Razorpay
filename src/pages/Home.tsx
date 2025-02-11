import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to E-Shop
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Discover our amazing products with secure payment powered by Worldpay
        </p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;