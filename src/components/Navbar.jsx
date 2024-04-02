import React, { useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const { User, logout } = context;

    const clickForLogout = async () => {
        try {
            await logout();
            toast.success("you logout");
            localStorage.removeItem("user");
            navigate("/login");

        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light fixed-top headerbar">
                <div className="container-fluid container">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {User &&
                            <ul className="navbar-nav ">
                                <li className="nav-item nav-heading">
                                    <a className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" href="/home">
                                        Home
                                    </a>
                                </li>

                                <li className="nav-item nav-heading">
                                    <a className={`nav-link ${location.pathname === "/addclient" ? "active" : ""}`} aria-current="page" href="/addclient">
                                        Add-Client
                                    </a>
                                </li>
                            </ul>
                        }


                    </div>
                    {User ?
                        <button className="btn btn-primary mx-2" onClick={clickForLogout}>LogOut</button>
                        :
                        <div className="d-flex ">
                            <a href="/login" className="btn btn-primary active mx-2" aria-current="page">Login</a>
                            <a href="/signup" className="btn btn-primary active mx-2" aria-current="page">SignUp</a>
                        </div>
                    }

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
