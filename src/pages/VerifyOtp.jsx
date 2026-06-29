import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const VerifyOtp = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);

        data.append("email", localStorage.getItem("email"));

        try {
            await api.post("/accounts/verify_email/", data);

            alert("Verification successful");

            navigate("/login");
        } catch(error) {
            console.error(error);

            alert("Invalid OTP");
        }
    }

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Verify Email</h2>

                        <form onSubmit={handleSubmit}>
                            <input type="text" name="otp" placeholder="Enter OTP" className="form-control mb-3" />
                            <button className="btn btn-success w-100">Verify</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyOtp