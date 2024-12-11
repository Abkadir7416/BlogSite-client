import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


const ProductDetails = () => {
  const location = useLocation();
  const segments = location.pathname.split("/"); // Split URL into parts
  const value = segments[1]; // Fetch 'book'
  const {id} = useParams();
  console.log('iiiddd: ', id)
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const book = await axios.get(`http://localhost:5000/api/shop/${value}/${id}`);
      console.log('bbookkkk: ', book.data.data);
      setBook(book.data.data);
    };
    fetchBook();
  }, []);


  // console.log("item: ", item);
  console.log("iddddd: ", id);
  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === book.id
    );

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...book, quantity });
    }

    setCart(updatedCart);
    alert(`${book.name} added to the cart!`);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleShopNow = () => {};
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Back Button */}
      <button
        className="text-black underline mb-4"
        onClick={() => window.history.back()}
      >
        Back to Shop
      </button>

      {/* Item Details */}
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row p-6">
        {/* Image Section */}
        {/* <div className="flex-1 justify-center ">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-lg w-96 h-1px object-cover"
          />
        </div> */}
        <div className="flex-2 flex justify-center items-center h-full ">
          <div>
            <img
              src={book.image}
              alt={book.name}
              className="rounded-lg w-120 h-[500px] object-cover px-8 py-2 border-2"
            />
            <button
              onClick={handleAddToCart}
              className="font-bold  mt-6 text-2xl mr-5 bg-yellow-500 text-white py-4  my-2 px-14 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleShopNow}
              className="font-bold  mt-6 text-2xl ml-5 bg-green-500 text-white py-4  my-2 px-14 rounded hover:bg-blue-600"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 lg:pl-8 mt-6 lg:mt-0">
          <h3 className="text-3xl text-gray-800">{book.name}</h3>
          <div className="flex items-center mt-4">
            <span className="bg-green-800 text-white px-3 py-1 rounded text-sm font-bold">
              <span className="mr-2">{book.rating}</span>
              <span className="color:white;">&#9733;</span>
            </span>
            <span className="text-gray-400 font-bold ml-3">
              140 Ratings & 4 Reviews
            </span>
          </div>
          {/* <p className="text-gray-600 mt-2">{item.description}</p> */}
          <p className=" mt-4 text-gray-900">
            <span className="text-4xl font-semibold"> ₹{book.price}</span>
            <span className="text-2xl mx-8 line-through font-semibold text-gray-500">
            ₹599
            </span>
            <span className="text-2xl font-semibold text-green-800">
              30% OFF
            </span>
          </p>

          <div className="text-gray-700">
            <h2 className="text-xl font-bold my-3">Available Offers</h2>

            <div class="grid grid-cols-[2rem_6rem_auto]">
              <div>
                <span class="material-icons text-green-500">sell</span>
              </div>
              <div className="font-bold text-l">Bank Offer</div>
              <div>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</div>

              <div>
                <span class="material-icons text-green-500">sell</span>
              </div>
              <div className="font-bold text-l">Bank Offer</div>
              <div>
                10% off up to ₹750 on HDFC Bank Credit Card EMI on 3 months
                tenure. Min. Txn Value: ₹7,500T&C
              </div>

              <div>
                <span class="material-icons text-green-500">sell</span>
              </div>
              <div className="font-bold text-l">Bank Offer</div>
              <div>
                10% off up to ₹1,000 on HDFC Bank Credit Card EMI on 6 and 9
                months tenure. Min Txn Value: ₹7,500T&C
              </div>

              <div>
                <span class="material-icons text-green-500">sell</span>
              </div>
              <div className="font-bold text-l">Bank Offer</div>
              <div>
                10% off up to ₹1,250 on HDFC Bank Credit Card EMI on 12months
                and above tenure. Min Txn Value:₹7,500T&C
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-[10rem_auto]">
            <div className="font-bold text-l">Delivery</div>
            <div className="">
              <input
                className="bottom-1 border-b-2 outline-none "
                type="text"
                name="location"
                id="pincode"
                placeholder="Enter Delivery Address"
              />
            </div>
            <div className="font-bold text-l">Seller</div>
            <div className="">PixelPage </div>
          </div>
          <h1 className="font-bold text-4xl text-gray-800 my-8 ml-5">
            Specifications
          </h1>
          <div class="grid grid-cols-[15rem_auto] ml-5">
            <span className="font-bold text-l text-gray-800">Author</span>
            <span>{book.author}</span>

            <span className="font-bold text-l text-gray-800">Seller</span>
            <span>{book.seller}</span>

            <span className="font-bold text-l text-gray-800">
              Publishing Date
            </span>
            <span>{book.publishingDate}</span>

            <span className="font-bold text-l text-gray-800">Publisher</span>
            <span>{book.publisher}</span>
          </div>

          {/* Quantity Selector */}
          {/* <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 px-4 py-2 rounded font-bold hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-200 px-4 py-2 rounded font-bold hover:bg-gray-300"
            >
              +
            </button>
          </div> */}

          {/* Add to Cart Button */}
          <br />
          {/* <button
            onClick={handleAddToCart}
            className="mt-6  mr-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
            onClick={handleShopNow}
            className="mt-6 ml-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Shop Now
          </button> */}
        </div>
      </div>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <div className="bg-white mt-8 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex justify-between items-center mt-4"
            >
              <div>
                <p className="text-gray-800">{cartItem.name}</p>
                <p className="text-gray-600 text-sm">
                  Quantity: {cartItem.quantity}
                </p>
              </div>
              <p className="text-gray-900">
                ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Payment Section */}
      {cart.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => alert("Proceeding to Payment...")}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Proceed to Payment
          </button>
        </div>
      )}

      <div className="mt-10">
        <h1 className="text-3xl">More Popular Books</h1>
      </div>
    </div>
  );
};

// Example item data for testing
const exampleItem = {
  id: 1,
  name: "The Great Gatsby",
  description: "A classic novel by F. Scott Fitzgerald.",
  price: 10.99,
  rating: 4.8,
  image: "https://via.placeholder.com/300x400",
};

export default ProductDetails;
