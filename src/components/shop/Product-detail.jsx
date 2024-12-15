import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const location = useLocation();
  const segments = location.pathname.split("/"); // Split URL into parts
  const value = segments[1]; // Fetch 'product'
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetchBook = async () => {
    try {
      const product = await axios.get(
        `https://blog-writer-test.vercel.app/api/shop/${value}/${id}`
      );
      setProduct(product.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await axios.get(`https://blog-writer-test.vercel.app/api/cart`, {
        headers: { Authorization: `${token}` },
      });
      setCart(cart.data.data);
    };
    fetchBook();
    fetchCart();
  }, []);

  const handleAddToCart = async () => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === product._id
    );
    if (existingItemIndex >= 0) {
      toast.warn("Item already exists in cart");
    } else {
      const cartObj = {
        productId: product._id,
        quantity: 1,
      };
      await axios.post(`https://blog-writer-test.vercel.app/api/cart`, cartObj, {
        headers: { Authorization: `${token}` },
      });
      toast.success("Item added to cart");
    }
    navigate("/cart");
  };

  const handleShopNow = () => {};
  return (
    <>
    {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
        <p className="mt-4 text-xl text-gray-500">Loading {value} detail page...</p>
      </div>
      ) : (
    
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Back Button */}
      <button
        className="text-black underline mb-4"
        onClick={() => window.history.back()}
      >
        Back to Shop
      </button>

      {/* Item Details */}

      {/* {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          <p className="ml-4 text-gray-500">Loading blogs...</p>
        </div>
      ) : ( */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row p-6">
          <div className="flex-2 flex justify-center items-center h-full ">
            <div>
              <img
                src={product.image}
                alt={product.name}
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
            <h3 className="text-3xl text-gray-800">{product.name}</h3>
            <div className="flex items-center mt-4">
              <span className="bg-green-800 text-white px-3 py-1 rounded text-sm font-bold">
                <span className="mr-2">{product.rating}</span>
                <span className="color:white;">&#9733;</span>
              </span>
              <span className="text-gray-400 font-bold ml-3">
                140 Ratings & 4 Reviews
              </span>
            </div>
            {/* <p className="text-gray-600 mt-2">{item.description}</p> */}
            <p className=" mt-4 text-gray-900">
              <span className="text-4xl font-semibold"> ₹{product.price}</span>
              <span className="text-2xl mx-8 line-through font-semibold text-gray-500">
                ₹599
              </span>
              <span className="text-2xl font-semibold text-green-800">
                30% OFF
              </span>
            </p>

            <div className="text-gray-700">
              <h2 className="text-xl font-bold my-3">Available Offers</h2>

              <div className="grid grid-cols-[2rem_6rem_auto]">
                <div>
                  <span className="material-icons text-green-500">sell</span>
                </div>
                <div className="font-bold text-l">Bank Offer</div>
                <div>
                  5% Unlimited Cashback on Flipkart Axis Bank Credit Card
                </div>

                <div>
                  <span className="material-icons text-green-500">sell</span>
                </div>
                <div className="font-bold text-l">Bank Offer</div>
                <div>
                  10% off up to ₹750 on HDFC Bank Credit Card EMI on 3 months
                  tenure. Min. Txn Value: ₹7,500T&C
                </div>

                <div>
                  <span className="material-icons text-green-500">sell</span>
                </div>
                <div className="font-bold text-l">Bank Offer</div>
                <div>
                  10% off up to ₹1,000 on HDFC Bank Credit Card EMI on 6 and 9
                  months tenure. Min Txn Value: ₹7,500T&C
                </div>

                <div>
                  <span className="material-icons text-green-500">sell</span>
                </div>
                <div className="font-bold text-l">Bank Offer</div>
                <div>
                  10% off up to ₹1,250 on HDFC Bank Credit Card EMI on 12months
                  and above tenure. Min Txn Value:₹7,500T&C
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-[10rem_auto]">
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
            {/* <div className="grid grid-cols-[15rem_auto] ml-5">
            <span className="font-bold text-l text-gray-800">Author</span>
            <span>{product.author}</span>

            <span className="font-bold text-l text-gray-800">Seller</span>
            <span>{product.seller}</span>

            <span className="font-bold text-l text-gray-800">
              Publishing Date
            </span>
            <span>{product.publishingDate}</span>

            <span className="font-bold text-l text-gray-800">Publisher</span>
            <span>{product.publisher}</span>
          </div> */}
            <div className="grid grid-cols-[15rem_auto] ml-5">
              {product.author && (
                <>
                  <span className="font-bold text-l text-gray-800">Author</span>
                  <span>{product.author}</span>
                  <span className="font-bold text-l text-gray-800">Seller</span>
                  <span>{product.seller}</span>

                  <span className="font-bold text-l text-gray-800">
                    Publishing Date
                  </span>
                  <span>{product.publishingDate}</span>

                  <span className="font-bold text-l text-gray-800">
                    Publisher
                  </span>
                  <span>{product.publisher}</span>
                </>
              )}
            </div>
          </div>
        </div>
      {/* )} */}
      {/* <div className="mt-10">
        <h1 className="text-3xl">More Popular Books</h1>
      </div> */}
    </div>
  )}
    </>
  );
};

export default ProductDetails;
