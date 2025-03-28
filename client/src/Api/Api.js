import axios from "axios";

axios
  .get("http://localhost:5000/test")
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
