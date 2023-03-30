import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import "./SideBar.css";
function SideBar() {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await httpRequest.get("categories/");
            setCats(res.data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItems">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    className="sidebarImg"
                    src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="sidebarImg"
                />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci illo harum nam repudiandae natus quidem, eligendi
                    unde voluptatem inventore? Porro, ea id.
                </p>
            </div>
            <div className="sidebarItems">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <Link
                            key={cat.cat_id}
                            to={`?cat=${cat.cat_name}`}
                            className="link"
                        >
                            <li className="sidebarListItems">{cat.cat_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItems">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcons fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcons fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcons fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcons fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
