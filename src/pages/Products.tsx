import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    description: "Feature-rich smartwatch with health tracking",
  },
  {
    id: "3",
    name: "Gaming Laptop",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    description: "High-performance laptop suitable for gaming and professional work",
  },
  {
    id: "4",
    name: "Smartphone",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    description: "Latest model smartphone with cutting-edge features",
  },
  {
    id: "5",
    name: "Tablet",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    description: "Lightweight tablet perfect for reading and browsing",
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Compact earbuds with superior sound quality and long battery life",
  },
];


function Products() {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
