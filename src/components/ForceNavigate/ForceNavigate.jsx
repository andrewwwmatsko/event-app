import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ForceNavigate() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/events", { replace: true });
  }, [navigate]);
}
