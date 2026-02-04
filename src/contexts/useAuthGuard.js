import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) navigate("/");
      });
  }, []);
}
