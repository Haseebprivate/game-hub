import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "bffc5da187ec440288a72a90c1504e87",
  },
});
