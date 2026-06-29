import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import BlogDetail from "./pages/BlogDetail"
import UpdateBlog from "./pages/UpdateBlog";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/register" element={<Register/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/verify" element={<VerifyOtp/>} /> 
        <Route path="/blog/:id" element={<BlogDetail/>} /> 
        <Route path="/update-blog/:id" element={<UpdateBlog/>} /> 
        <Route path="/my-blogs" element={<MyBlogs/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App