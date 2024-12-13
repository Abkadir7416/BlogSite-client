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