import axios from "axios";
import { serverUrl } from "../lib/config";
// const serverUrl = "http://127.0.0.1:8000/";

export default axios.create({
  baseURL: serverUrl,
});