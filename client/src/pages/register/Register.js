import { useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import "./Register.css";
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [passwords, setPasswords] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            if (username) {
                if (email) {
                    if (passwords) {
                        const res = await httpRequest.post("auth/register/", {
                            username,
                            email,
                            passwords,
                        });
                        res.data && window.location.replace("/login");
                    } else {
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your email..."
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Enter your passwords..."
                    onChange={(e) => {
                        setPasswords(e.target.value);
                    }}
                />
                <button className="registerBtn">Register</button>
            </form>
            <button className="registerLoginBtn">
                <Link to="/login" className="link">
                    Login
                </Link>
            </button>
            {error && (
                <span style={{ color: "red", marginTop: "10px" }}>
                    Something went wrong!
                </span>
            )}
        </div>
    );
}

export default Register;
