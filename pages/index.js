import styles from "../styles/Index.module.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { setMachineNameRedux } from "../reducers/user";
import { setCurrentMachineDisplay } from "../reducers/user";
import { useRouter } from "next/router";

function Index() {
  console.log("start ---> URL");
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("---> inside useEffect NO Async");
    (async () => {
      console.log("---> inside useEffect Async");
      try {
        console.log("NEXT_PUBLIC_API_BASE_URL");
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
        console.log("API URL is : ");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`
        );
        const responseJson = await response.json();
        console.log(responseJson);
        const currentMachineDisplay = {
          machineName: responseJson.machineName,
          urlFor404Api: responseJson.urlFor404Api,
        };

        dispatch(setCurrentMachineDisplay(currentMachineDisplay));
      } catch {
        console.error("NICK Custom error ====> ");
        console.error("Error fetching data:");
        dispatch(
          setCurrentMachineDisplay({
            machineName: "failed to get API response",
            urlFor404Api: null,
          })
        );
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
          <h2>{user.currentMachineDisplay.machineName}</h2>
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
