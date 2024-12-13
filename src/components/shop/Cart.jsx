import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
    const [loading, setLoading] = useState(true);
// const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `${token}` },
        });
        setCartItems(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  // Handle item quantity change with API call
  const handleQuantityChange = async (id, change) => {
    try {
      const token = localStorage.getItem("token");
      const action = change > 0 ? "increment" : "decrement";
      const response = await axios.put(
        "http://localhost:5000/api/cart",
        { productId: id, action },
        { headers: { Authorization: `${token}` } }
      );
      if (response.data.message === "Quantity cannot be less than 1.") {
        toast.warn(response.data.message);
        return;
      }

      // Update local state with the updated cart items
      const updatedItem = response.data.cart.items.find(
        (item) => item.productId === id
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        )
      );

      toast.success(`Quantity ${action}ed successfully!`);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.warn(error.response.data.message);
    }
  };

  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setShowPopup(true);
  };

  const handleRemoveConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cart/${itemToRemove.id}`, {
        headers: { Authorization: `${token}` },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToRemove.id)
      );
      toast.success("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    } finally {
      setShowPopup(false);
      setItemToRemove(null);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setItemToRemove(null);
  };

  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Additional Price Details
  const discount = subtotal > 2000 ? 300 : 100;
  const couponDiscount = 50;
  const platformFee = 20;
  const deliveryCharges = subtotal > 1500 ? 0 : 50;
  const totalAmount =
    subtotal - discount - couponDiscount + platformFee + deliveryCharges;
  const savings = discount + couponDiscount;

  return (
    <div className="flex flex-col md:flex-row p-6 gap-20">
      
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white p-4 shadow rounded-lg">
      <button
        className="text-black underline mb-4"
        // onClick={()=> navigate('/shop')}
        onClick={() => window.history.back()}
      >
        Go to Back
      </button>

        <h2 className="text-4xl font-semibold text-center mb-6 underline">Cart Items</h2>
        {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          <p className="ml-4 text-gray-500">Loading Cart Items...</p>
        </div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b px-10 py-6"
              >
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
                    <span className="px-4 py-1 text-lg border-2">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 pb-1 text-2xl font-bold rounded-full border-2"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className=" text-right">
                  <h3 className="text-2xl font-medium">{item.name}</h3>
                  <p className="text-xl text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-xl text-gray-600">
                    Total: ₹{item.price * item.quantity}
                  </p>
                  <button
                    className="text-red-500 text-xl font-semibold mt-2 hover:underline"
                    onClick={() => handleRemoveClick(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-gray-500">
              Your cart is empty!
            </p>
          )}
        </>
      )}
      </div>

      {/* Right Section: Price Details */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 shadow rounded-lg self-start">
        <h2 className="text-xl font-semibold mb-6 underline">Price Details</h2>
        <div className="flex justify-between mb-4">
          <span className="text-md font-medium">
            Price ({totalItems} items):
          </span>
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
        <div className="flex justify-between font-semibold text-lg mb-4 border-t pt-4">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
        <p className="text-sm text-green-700 font-medium mb-4">
          You will save ₹{savings} on this order
        </p>
        <button className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg text-lg">
          Place Order
        </button>
      </div>

      {/* Popup for Confirmation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl"
              onClick={handlePopupClose}
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4">Confirm Remove</h3>
            <p>Are you sure you want to remove this item from the cart?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleRemoveConfirm}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                onClick={handlePopupClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
