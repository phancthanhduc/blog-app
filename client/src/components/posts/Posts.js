import Post from "../post/Post";
import "./Posts.css";
function Posts({ posts }) {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post key={post.post_id} post={post} />
            ))}
        </div>
    );
}

export default Posts;
