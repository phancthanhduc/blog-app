import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import httpRequest from "../../utils/httpRequest";
import "./Write.css";
function Write() {
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [post_desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            user_id: user.user_id,
            title,
            post_desc,
            cat_id: 1,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;
            try {
                await httpRequest.post("/upload", data);
            } catch (error) {}
        }
        try {
            const res = await httpRequest.post("posts", newPost);
            window.location.replace("/post/" + res.data.post_id);
        } catch (error) {}
    };

    return (
        <div className="write">
            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="writeImg"
                    className="writeImg"
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input
                        className="writeFileInput"
                        type="file"
                        id="fileInput"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        className="writeInput"
                        type="text"
                        placeholder="Title"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Write;
