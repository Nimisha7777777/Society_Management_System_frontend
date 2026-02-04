// src/hooks/useMyParking.js
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";

export default function useMyParking() {
  const { user } = useAuth();
  const [myParking, setMyParking] = useState(null);

  useEffect(() => {
    const flatId = user?.flatId || user?.flat?.flatId;
    if (!flatId) return;

    const fetchParking = async () => {
      try {
        const res = await api.get(`/api/resident/parking/${flatId}`);
        setMyParking(res.data);
      } catch (err) {
        console.error("Failed to fetch my parking", err);
      }
    };

    fetchParking();
  }, [user]);

  return myParking;
}
