import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      await api.post("/accounts/register/", data);

      localStorage.setItem("email", data.get("email"));

      alert("OTP sent successfully");
      navigate("/verify");
    } catch (error) {
      console.error(error.response.data);

      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>

              <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" className="form-control mb-3" />
                <input type="text" name="last_name" placeholder="Last Name" className="form-control mb-3" />
                <input type="email" name="email" placeholder="Email" className="form-control mb-3" />
                
                <div className="position-relative mb-3">
                  <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      placeholder="Password" 
                      className="form-control mb-3" 
                  />

                  <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{cursor: "pointer"}}
                      onClick={() => setShowPassword(!showPassword)}
                  >
                      {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                  </span>
                </div>

                <button className="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
