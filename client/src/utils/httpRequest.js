import axios from "axios";

const httpRequest = axios.create({
    baseURL: "http://52.65.233.83:8080/api/",
});

export default httpRequest;
