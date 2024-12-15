import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = ({ heading, endpoint }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null); // Reference to the scrollable container

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://blog-writer-test.vercel.app/api/shop/${endpoint}`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleItem = (id) => {
    navigate(`/${endpoint}/${id}`);
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth; // Scroll width equal to container width (5 items)
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-200 px-8 py-8 relative ">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {heading}
      </h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-60">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
        <p className="mt-4 text-xl text-gray-500">Loading {heading}...</p>
      </div>
      ) : (
        <div className="relative">
          {products.length > 4 && (
            <>
              {/* Left Arrow */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 z-10"
                onClick={() => handleScroll("left")}
              >
                &#8592;
              </button>
              {/* Right Arrow */}
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 z-10"
                onClick={() => handleScroll("right")}
              >
                &#8594;
              </button>
            </>
          )}

          {/* Products Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-10 overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-hide"
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="flex-none w-1/5 bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => handleItem(product._id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover object-top"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <span className="bg-yellow-400 text-white text-sm font-semibold px-2 py-1 rounded">
                      ⭐ {product.rating || 4.5}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Ordered: ${product.name}`);
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
