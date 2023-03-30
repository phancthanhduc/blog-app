import "./Header.css";
function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitle-Sm">React & Node</span>
                <span className="headerTitle-Lg">Blog</span>
            </div>
            <img
                className="headerImg"
                src="https://images.pexels.com/photos/490411/pexels-photo-490411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="mountains"
            />
        </div>
    );
}

export default Header;
