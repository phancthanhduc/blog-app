import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import httpRequest from "../../utils/httpRequest";
import "./SinglePost.css";
function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [post_desc, setPostDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const { user: userLogin } = useContext(Context);
    const PF = "http://localhost:5000/images/";
    useEffect(() => {
        const fetchPost = async () => {
            const res = await httpRequest.get("posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setPostDesc(res.data.post_desc);
        };

        fetchPost();
    }, [path]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await httpRequest.get(`users/${post.user_id}`);
            setUser(res.data);
        };
        if (Object.keys(post).length !== 0) {
            fetchUser();
        }
    }, [post]);

    const handleDelete = async () => {
        try {
            await httpRequest.delete("posts/" + path, {
                data: {
                    user_id: userLogin.user_id,
                },
            });
            window.location.replace("/");
        } catch (error) {}
    };

    const handleUpdate = async () => {
        try {
            await httpRequest.put("posts/" + path, {
                user_id: userLogin.user_id,
                title,
                post_desc,
            });
            setUpdateMode(false);
        } catch (error) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        src={PF + post.photo}
                        alt="postImg"
                        className="postImg"
                    />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.user_id === userLogin?.user_id && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcons fa-regular fa-pen-to-square"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcons fa-regular fa-trash-can"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?userid=${user.user_id}`} className="link">
                            <b>{user.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={post_desc}
                        onChange={(e) => setPostDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{post_desc}</p>
                )}
                {updateMode && (
                    <button className="singlePostBtn" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}

export default SinglePost;
