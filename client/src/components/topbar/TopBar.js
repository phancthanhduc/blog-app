import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./TopBar.css";
function TopBar() {
    const PF = "https://backend-blog.gm2g.com/images/";
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcons fa-brands fa-square-facebook"></i>
                <i className="topIcons fa-brands fa-square-twitter"></i>
                <i className="topIcons fa-brands fa-square-pinterest"></i>
                <i className="topIcons fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItems">
                        <Link to="/" className="link">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItems">
                        <Link to="/" className="link">
                            ABOUT
                        </Link>
                    </li>
                    <li className="topListItems">
                        <Link to="/" className="link">
                            CONTACT
                        </Link>
                    </li>
                    <li className="topListItems">
                        <Link to="/write" className="link">
                            WRITE
                        </Link>
                    </li>
                    <li className="topListItems" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings" className="link">
                        <img
                            src={PF + user.profilePic}
                            alt="avatar"
                            className="topImage"
                        />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItems">
                            <Link to="/login" className="link">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topListItems">
                            <Link to="/register" className="link">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}

export default TopBar;
