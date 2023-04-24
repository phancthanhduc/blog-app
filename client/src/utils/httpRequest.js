import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://backend-blog.gm2g.com/api",
});

export default httpRequest;
