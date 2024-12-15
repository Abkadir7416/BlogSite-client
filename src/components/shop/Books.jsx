import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { toast } from "react-toastify";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await axios.get(`http://localhost:5000/api/shop/books`);
        setBooks(books.data.data);
      } catch (error) {
        console.error("Error fetching Books:", error);
        toast.error("Failed to fetch Books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleItem = (id) => {
    navigate(`/book/${id}`);
  };
  return (
    <div className="bg-gray-200 px-8 pt-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Books
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(80vh-100px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          <p className="ml-4 text-gray-500">Loading Cart Items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {books.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out mb-10"
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
                  onClick={() => alert(`Ordered: ${product.name}`)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
