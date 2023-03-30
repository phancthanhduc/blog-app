import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import httpRequest from "../../utils/httpRequest";
import "./Login.css";
function Login() {
    const userRef = useRef();
    const passwordsRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await httpRequest.post("auth/login", {
                username: userRef.current.value,
                passwords: passwordsRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Enter your passwords..."
                    ref={passwordsRef}
                />
                <button
                    className="loginBtn"
                    type="submit"
                    disabled={isFetching}
                >
                    Login
                </button>
            </form>
            <button className="loginRegisterBtn">
                <Link to="/register" className="link">
                    Register
                </Link>
            </button>
        </div>
    );
}

export default Login;
