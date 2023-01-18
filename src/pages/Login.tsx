import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Button } from "../components/Button";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.hash.substring(1));

  useEffect(() => {
    const token =
      query.get("access_token") || localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("access_token", token);
      navigate("/");
    }
  }, []);

  const login = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=token`;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button onClick={login}>Login to Spotify</Button>
    </div>
  );
};

export default Login;
