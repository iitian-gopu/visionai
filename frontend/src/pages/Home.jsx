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
