import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";
import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [warming, setWarming] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const wakeService = async (url) => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 75000);

    try {
      await fetch(url, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        signal: controller.signal,
      });
    } catch (error) {
      console.log(`Warmup failed for ${url}`, error);
    } finally {
      clearTimeout(timeout);
    }
  };

  // Wake all 5 Render services when frontend opens
  useEffect(() => {
    const warmBackend = async () => {
      setWarming(true);

      const services = [
        "https://visionai-gateway-ctaq.onrender.com/",
        "https://visionai-auth.onrender.com/",
        "https://visionai-chat.onrender.com/",
        "https://visionai-agent.onrender.com/",
        "https://visionai-billing.onrender.com/",
      ];

      try {
        console.log("Starting VisionAI backend services...");

        await Promise.allSettled(
          services.map((url) => wakeService(url))
        );

        console.log("VisionAI backend warmup finished");
      } catch (error) {
        console.log("Warmup error:", error);
      } finally {
        setWarming(false);
      }
    };

    warmBackend();
  }, []);

  const handleLogin = async (token) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { data } = await api.post("/api/auth/login", {
          token,
        });

        dispatch(setUserdata(data));

        return;
