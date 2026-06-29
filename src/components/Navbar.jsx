import { Link, useNavigate } from "react-router-dom"

import logoImg from "../assets/logo.avif";

const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("access");

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("email");

        navigate("/login");
    }


  return (
    <div>
        <nav
            className="navbar navbar-expand-sm navbar-white bg-white"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logoImg} alt="Logo" style={{width: "5rem"}} />
                </Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mx-auto mt-2 d-flex gap-3 mt-lg-0">
                        <li className="nav-item">
                            <Link className="custom-link" to="#">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="custom-link" to="#">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            {token && (
                                <Link to="/my-blogs" className="custom-link">My Blogs</Link>
                            )}
                        </li>
                    </ul>
                    
                    <div className="d-flex gap-3">
                        {token ? (
                            <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
                        ) : (
                            <div>
                                <Link to="/login" className="custom-link">Login</Link>

                                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        
    </div>
  )
}

export default Navbar