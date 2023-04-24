import { useContext, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import httpRequest from "../../utils/httpRequest";
import "./Settings.css";
const PF = "https://backend-blog.gm2g.com/images/";
function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState("Da Nang");
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            user_id: user.user_id,
            username,
            email,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updatedUser.profilePic = fileName;
            try {
                await httpRequest.post("/upload", data);
            } catch (error) {}
        }
        try {
            const res = await httpRequest.put(
                "users/" + user.user_id,
                updatedUser
            );
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setSuccess(true);
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">
                        Update Your Account
                    </span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfilePicture">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : PF + user.profilePic
                            }
                            alt="avatar"
                            className="settingsProfilePictureImg"
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsProfilePictureIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input
                            className="settingsFileInput"
                            type="file"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: "20px",
                            }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
            <SideBar />
        </div>
    );
}

export default Settings;
