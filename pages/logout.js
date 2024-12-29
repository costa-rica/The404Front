import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/user";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(logoutUser());
    window.alert("Logged out :)");
    router.push("/login");
  }, []);
}
