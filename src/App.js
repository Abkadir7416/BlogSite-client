import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogList from "./components/BlogList";
import About from  "./components/About";
import Contact from  "./components/Contact";
import BlogDetail from "./components/BlogDetail";
import UpdateBlog from "./components/UpdateBlog";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "./components/BlogForm";
import WriterDetailPage from "./components/WriterDetails";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/Product-detail";
import Cart from "./components/shop/Cart";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-blog" element={<BlogForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/book/:id" element={<ProductDetails />} />
              <Route path="/study-tool/:id" element={<ProductDetails />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
              <Route path="/writer/:id" element={<WriterDetailPage />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}
// ================================

// import React, { useState } from "react";

// const Cart = () => {
//   // Sample cart data
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "The Great Gatsby",
//       price: 499,
//       image: "https://via.placeholder.com/150",
//       count: 1,
//     },
//     {
//       id: 2,
//       name: "To Kill a Mockingbird",
//       price: 399,
//       image: "https://via.placeholder.com/150",
//       count: 1,
//     },
//   ]);

//   // Handle increment count
//   const incrementCount = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   // Handle decrement count
//   const decrementCount = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.count > 1
//           ? { ...item, count: item.count - 1 }
//           : item
//       )
//     );
//   };

//   // Handle remove item
//   const removeItem = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Calculate total price
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.count,
//     0
//   );

//   return (
//     <div className="flex flex-col md:flex-row justify-between px-4 py-6">
//       {/* Left Section - Cart Items */}
//       <div className="md:w-2/3 w-full">
//         <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border-b border-gray-200 py-4"
//           >
//             {/* Image and Quantity Section */}
//             <div className="flex items-center space-x-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />
//               <div>
//                 <button
//                   onClick={() => decrementCount(item.id)}
//                   className="px-3 py-1 bg-gray-300 rounded-l-lg hover:bg-gray-400"
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-1 bg-gray-200">{item.count}</span>
//                 <button
//                   onClick={() => incrementCount(item.id)}
//                   className="px-3 py-1 bg-gray-300 rounded-r-lg hover:bg-gray-400"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Item Details Section */}
//             <div className="flex-1 pl-4">
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-gray-500">Price: ₹{item.price}</p>
//               <button
//                 onClick={() => removeItem(item.id)}
//                 className="mt-2 text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Section - Price Details */}
//       <div className="md:w-1/3 w-full md:ml-6 mt-6 md:mt-0">
//         <h2 className="text-2xl font-bold mb-4">Price Details</h2>
//         <div className="bg-gray-100 p-4 rounded-lg space-y-2">
//           <div className="flex justify-between">
//             <span>Total Items:</span>
//             <span>{cartItems.length}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Total Price:</span>
//             <span>₹{totalPrice}</span>
//           </div>
//         </div>
//         <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
