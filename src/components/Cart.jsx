// // components/Cart.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Cart = ({ userId }) => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const response = await axios.get(`/api/cart/${userId}`);
//       setCartItems(response.data);
//     };
//     fetchCart();
//   }, [userId]);

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.map((item, index) => (
//         <div key={index}>
//           <p>Product ID: {item.productId}</p>
//           <p>Quantity: {item.quantity}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cart;
