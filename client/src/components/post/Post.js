import { useEffect, useState } from "react";
import httpRequest from "../../utils/httpRequest";
import { Link } from "react-router-dom";
import "./Post.css";
function Post({ post }) {
    const [category, setCategory] = useState({});
    const PF = "http://52.65.233.83:8080/images/";
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await httpRequest.get(`categories/${post.cat_id}`);
            setCategory(res.data);
        };
        fetchCategory();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="post">
            {/* "https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" */}
            {post.photo && (
                <Link to={`post/${post.post_id}`} className="link">
                    <img
                        src={PF + post.photo}
                        alt="postImg"
                        className="postImg"
                    />
                </Link>
            )}
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">{category.cat_name}</span>
                </div>
                <Link to={`post/${post.post_id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">{post.post_desc}</p>
        </div>
    );
}

export default Post;
