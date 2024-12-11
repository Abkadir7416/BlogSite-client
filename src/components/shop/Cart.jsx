// import React, { useState } from "react";

// function Cart() {
//   // Example cart data
//   const [cartItems, setCartItems] = useState([]);

//   // Handle item quantity change
//   const handleQuantityChange = (id, change) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   // Handle item removal
//   const handleRemoveItem = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Calculate totals
//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="flex flex-col md:flex-row p-6 gap-6">
//       {/* Left Section: Cart Items */}

//       <div className="flex-1 bg-white p-4 shadow rounded-lg">
//         <h2 className="text-2xl font-semibold mb-6 underline">Cart Items</h2>
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border-b py-6"
//           >
//             {/* Image and Quantity Controls */}
//             <div className="flex flex-col items-center gap-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-56 h-28 object-cover rounded-lg"
//               />
//               <div className="flex items-center gap-2">
//                 <button
//                   className="px-3 pb-1 text-2xl font-bold rounded-full border-2"
//                   onClick={() => handleQuantityChange(item.id, -1)}
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-1 text-lg border-2">{item.quantity}</span>
//                 <button
//                   className="px-3 pb-1 text-2xl font-bold rounded-full border-2"
//                   onClick={() => handleQuantityChange(item.id, 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Item Details */}
//             <div className="flex-1 pl-20">
//               <h3 className="text-3xl mb-2">{item.name}</h3>
//               <p className="text-xl text-gray-600">Price: ₹{item.price}</p>
//               <p className="text-xl text-gray-600">
//                 Total: ₹{item.price * item.quantity}
//               </p>
//               <button
//                 className="text-red-500 text-xl mt-2 hover:underline"
//                 onClick={() => handleRemoveItem(item.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Section: Price Details */}

//       {/* <div className="w-full md:w-1/3 bg-gray-100 p-4 shadow rounded-lg self-start">
//         <h2 className="text-xl font-semibold mb-4">Price Details</h2>
//         <div className="flex justify-between mb-2">
//           <span>Total Items:</span>
//           <span>{totalItems}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Subtotal:</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Tax (5%):</span>
//           <span>₹{(subtotal * 0.05).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-semibold text-lg">
//           <span>Total:</span>
//           <span>₹{(subtotal + subtotal * 0.05).toFixed(2)}</span>
//         </div>
//         <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg">
//           Place Order
//         </button>
//       </div> */}

// <div className="w-full md:w-1/3 bg-gray-100 p-6 shadow rounded-lg self-start">
//   <h2 className="text-xl font-semibold mb-6">Price Details</h2>
  
//   {/* Price Breakdown */}
//   <div className="flex justify-between mb-4">
//     <span className="text-md">Price (6 items):</span>
//     <span className="text-md">₹{totalPrice}</span>
//   </div>
  
//   <div className="flex justify-between mb-4">
//     <span className="text-md">Discount:</span>
//     <span className="text-md text-green-600">− ₹{discount}</span>
//   </div>
  
//   <div className="flex justify-between mb-4">
//     <span className="text-md">Coupons for you:</span>
//     <span className="text-md text-green-600">− ₹{couponDiscount}</span>
//   </div>
  
//   <div className="flex justify-between mb-4">
//     <span className="text-md">Platform Fee:</span>
//     <span className="text-md">₹{platformFee}</span>
//   </div>
  
//   <div className="flex justify-between mb-4">
//     <span className="text-md">Delivery Charges:</span>
//     <span className="text-md">{deliveryCharges > 0 ? `₹${deliveryCharges}` : "Free"}</span>
//   </div>
  
//   {/* Total Amount */}
//   <div className="flex justify-between font-semibold text-lg mb-4 border-t pt-4">
//     <span>Total Amount:</span>
//     <span>₹{totalAmount}</span>
//   </div>

//   {/* Savings */}
//   <p className="text-sm text-green-700 font-medium mb-4">
//     You will save ₹{savings} on this order
//   </p>
  
//   {/* Place Order Button */}
//   <button className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg text-lg">
//     Place Order
//   </button>
// </div>

//     </div>
//   );
// }

// export default Cart;

// ================================================================

import React, { useState } from "react";

function Cart() {
  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      image: "https://via.placeholder.com/150",
      price: 499,
      quantity: 2,
    },
    {
      id: 2,
      name: "Atomic Habits",
      image: "https://via.placeholder.com/150",
      price: 699,
      quantity: 1,
    },
  ]);

  // Handle item quantity change
  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Additional Price Details
  const discount = subtotal > 2000 ? 300 : 100; // Example discount logic
  const couponDiscount = 50; // Flat coupon discount
  const platformFee = 20;
  const deliveryCharges = subtotal > 1500 ? 0 : 50; // Free delivery for orders above ₹1500
  const totalAmount = subtotal - discount - couponDiscount + platformFee + deliveryCharges;
  const savings = discount + couponDiscount;

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white p-4 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 underline">Cart Items</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-6"
          >
            {/* Image and Quantity Controls */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-56 h-28 object-cover rounded-lg"
              />
              <div className="flex items-center gap-2">
                <button
                  className="px-3 pb-1 text-2xl font-bold rounded-full border-2"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg border-2">{item.quantity}</span>
                <button
                  className="px-3 pb-1 text-2xl font-bold rounded-full border-2"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Item Details */}
            <div className="flex-1 pl-20">
              <h3 className="text-3xl mb-2">{item.name}</h3>
              <p className="text-xl text-gray-600">Price: ₹{item.price}</p>
              <p className="text-xl text-gray-600">
                Total: ₹{item.price * item.quantity}
              </p>
              <button
                className="text-red-500 text-xl mt-2 hover:underline"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p className="text-center text-lg font-semibold text-gray-500">
            Your cart is empty!
          </p>
        )}
      </div>

      {/* Right Section: Price Details */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 shadow rounded-lg self-start">
        <h2 className="text-xl font-semibold mb-6 underline">Price Details</h2>

        {/* Price Breakdown */}
        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">Price ({totalItems} items):</span>
          <span className="text-md">₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">Discount:</span>
          <span className="text-md text-green-600">− ₹{discount}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">Coupons for you:</span>
          <span className="text-md text-green-600">− ₹{couponDiscount}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">Platform Fee:</span>
          <span className="text-md">₹{platformFee}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">Delivery Charges:</span>
          <span className="text-md">
            {deliveryCharges > 0 ? `₹${deliveryCharges}` : "Free"}
          </span>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between font-semibold text-lg mb-4 border-t pt-4">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>

        {/* Savings */}
        <p className="text-sm text-green-700 font-medium mb-4">
          You will save ₹{savings} on this order
        </p>

        {/* Place Order Button */}
        <button className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg text-lg">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
