// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-slate-900 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <a href="/" className="text-white text-2xl font-bold">
//           BlogSite
//         </a>
//         <div className="block lg:hidden">
//           <button 
//             onClick={toggleMenu} 
//             className="text-white focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//             </svg>
//           </button>
//         </div>
//         <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
//           <ul className="lg:flex lg:justify-end">
//             <li className="text-white lg:ml-4">
//               <a href="/home" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Home
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/blogs" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Blogs
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 About
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/contact" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <nav className="bg-slate-900 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-2xl font-bold">
//           BlogSite
//         </Link>
//         <div>
//           {token ? (
//             <div className="flex space-x-4">
//               <Link to="/home" className="text-white hover:text-gray-200">
//                 Home
//               </Link>
//               <Link to="/blogs" className="text-white hover:text-gray-200">
//                 Blogs
//               </Link>
//               <Link to="/about" className="text-white hover:text-gray-200">
//                 About
//               </Link>
//               <Link to="/contact" className="text-white hover:text-gray-200">
//                 Contact
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-white hover:text-gray-200"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex space-x-4">
//               <Link to="/login" className="text-white hover:text-gray-200">
//                 Login
//               </Link>
//               <Link to="/register" className="text-white hover:text-gray-200">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// ===============================================

// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import { FaShoppingCart } from 'react-icons/fa';


// const Navbar = () => {
//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/"); // Redirect to landing page on logout
//     toast.success('Logged out!!')
//   };

//   return (
//         <nav className="bg-slate-900 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-2xl font-bold">
//           BlogSite
//         </Link>
//         <div>
//           {isLoggedIn ? (
//             <div className="flex space-x-4">
//               <Link to="/home" className="text-white hover:text-gray-200">
//                 Home
//               </Link>
//               <Link to="/blogs" className="text-white hover:text-gray-200">
//                 Blogs
//               </Link>
//               <Link to="/about" className="text-white hover:text-gray-200">
//                 About
//               </Link>
//               <Link to="/contact" className="text-white hover:text-gray-200">
//                 Contact
//               </Link>
//               <Link to="/shop" className="text-white hover:text-gray-200">
//                 Shopping
//               </Link>
//               <Link to="/cart" className="text-white hover:text-gray-200">
//               <FaShoppingCart size={24} />
//               </Link>
//               <button onClick={handleLogout} className="text-white hover:text-gray-200">
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex space-x-4">
//               <Link to="/login" className="text-white hover:text-gray-200">
//                 Login
//               </Link>
//               <Link to="/register" className="text-white hover:text-gray-200">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// =======================================================

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); // State to manage cart count

  // Function to fetch the cart count from the database
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://blog-writer-test.vercel.app/api/cart",
        {
          headers: { Authorization: `${token}` },
        }
      ); // Replace with your API endpoint
      console.log('response:: :', response.data.data);
      setCartCount(response.data.data.length || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      toast.error("Failed to fetch cart count.");
    }
  };

  // Fetch cart count on component mount and when cart updates
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartCount();
    }
  }, [isLoggedIn]);

  // Simulate a cart update (you can also set up a WebSocket or other real-time solution)
  const handleCartUpdate = () => {
    fetchCartCount(); // Call this function whenever cart items are updated
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to landing page on logout
    toast.success("Logged out!!");
  };

  return (
    <nav className="bg-slate-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          BlogSite
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex space-x-4 items-center">
              <Link to="/home" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link to="/blogs" className="text-white hover:text-gray-200">
                Blogs
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200">
                About
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-200">
                Contact
              </Link>
              <Link to="/shop" className="text-white hover:text-gray-200">
                Shopping
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-white hover:text-gray-200">
                  <FaShoppingCart size={24} />
                </Link>
                {cartCount > 0 && (
                  <div className="absolute -top-3 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
