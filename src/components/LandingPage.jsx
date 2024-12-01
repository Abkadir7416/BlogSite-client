

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn state from AuthContext

  const handleExplore = () => {
    if (isLoggedIn) {
      navigate("/home"); // Redirect to home if logged in
    } else {
      toast.info("Please log in to explore the content"); // Show message if not logged in
      navigate("/login"); // Redirect to login
    }
  };

  return (
    <div className="h-auto flex items-center justify-center bg-gradient-to-b text-black p-4 pt-32">
      <div className="flex flex-col gap-20 lg:flex-row items-center lg:items-start max-w-6xl p-4">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome to BlogSite</h1>
          <p className="text-lg mb-6">
            Discover insightful articles, explore the latest trends, and stay
            informed with expert opinions on topics that matter. Join our
            community today!
          </p>
          <button
            onClick={handleExplore}
            className="block px-6 py-3 bg-slate-900 font-semibold text-white rounded-lg transition"
          >
            Explore
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0 lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
          <img
            src="data:image/png;base64,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" // Replace with your image URL
            alt="Welcome"
            className="w-full h-64 lg:h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
