import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserProvider";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useUser(); // ✅ Get user from context
  const navigate = useNavigate();
 
  const handlePayment = async () => {
    if (!user) {
      alert("Please log in to proceed with payment.");
      return;
    }
  
    try {
      const { data } = await axios.post("http://localhost:5000/payment/create-order", { amount: Math.round(total) });
      
      // Transform cart items to match expected structure:
      const transformedCart = cart.map(item => ({
        product: {
          name: item.name,
          price: item.price,
        },
        quantity: item.quantity,
      }));
  
      const options = {
        key: "rzp_test_FJ1F7ZP4wtEOg1",
        amount: data.order.amount,
        currency: "INR",
        name: "E-Shop",
        description: `Order for ${cart.length} items`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/payment/verify-payment", {
              ...response,
              cart: transformedCart, // send the transformed cart
              userId: user.id, 
            });
    
            alert("Payment successful!");
            clearCart();
            navigate("/orders");
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment failed. Your order has been marked as failed.");
            navigate("/orders");
          }
        },
        theme: { color: "#2563eb" },
      };
    
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Unable to initiate payment.");
    }
  };
   

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Pay Now ₹{Math.round(total)}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
