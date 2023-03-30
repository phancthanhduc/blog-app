import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./Single.css";
function Single() {
    return (
        <div className="single">
            <SinglePost />
            <SideBar />
        </div>
    );
}

export default Single;
