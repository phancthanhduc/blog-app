import axios from "axios";

const httpRequest = axios.create({
    baseURL: "http://localhost:5000/api/",
});

export default httpRequest;
