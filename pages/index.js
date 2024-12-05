import styles from "../styles/Index.module.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setMachineNameRedux } from "../reducers/user";
import { useRouter } from "next/router";

function Index() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        console.log("NEXT_PUBLIC_API_BASE_URL");
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
        console.log("API URL is : ");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`
        );
        const responseJson = await response.json();
        console.log(responseJson);
        dispatch(setMachineNameRedux(responseJson.machineName));
      } catch {
        console.error("Error fetching data:");
        dispatch(setMachineNameRedux("failed to get API response"));
      }
    })();
  }, []);

  const handleClickToLogin = () => router.push("/login");
  const handleClickToReg = () => router.push("/register");

  return (
    <div className={styles.main}>
      <div className={styles.divMainSub}>
        <div className={styles.divTitles}>
          <h1 className={styles.title}>The 404 Server Manager</h1>
          <h2>{user.machineName}</h2>
        </div>

        <div className={styles.divInputsAndBtns}>
          <div className={styles.divBtnLogin}>
            <button
              className={styles.btnLogin}
              onClick={() => handleClickToLogin()}
            >
              Login
            </button>
          </div>
          <div className={styles.divBtnRegister}>
            <button
              className={styles.btnRegister}
              onClick={() => handleClickToReg()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
