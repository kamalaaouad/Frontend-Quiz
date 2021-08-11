import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:8085",
    headers:{
        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
    }
});