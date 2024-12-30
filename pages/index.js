import styles from "../styles/Index.module.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { setMachineNameRedux } from "../reducers/user";
import { setCurrentMachineDisplay } from "../reducers/user";
import { useRouter } from "next/router";

function Index() {
  console.log(
    `home/index page URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`
  );
  // const user = useSelector((state) => state.user.value);
  const userReducer = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchMachineName();
  }, []);

  const fetchMachineName = async () => {
    console.log(" inside fetchMachineName");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`
      );
      const responseJson = await response.json();
      console.log(responseJson);
      const currentMachineDisplay = {
        machineName: responseJson.machineName,
        urlFor404Api: responseJson.urlFor404Api,
        nginxStoragePathOptions: responseJson.nginxStoragePathOptions,
        // userHomeDir: responseJson.userHomeDir,
        // nginxDir: responseJson.nginxDir,
      };

      dispatch(setCurrentMachineDisplay(currentMachineDisplay));
      console.log(" finished fetchMachineName");
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
    if (userReducer.token) {
      console.log(
        " finished fetchMachineName > token exists > goign to /status"
      );
      // Redirect if token exists
      router.push("/status");
    }
  };
  const handleClickToLogin = () => router.push("/login");
  const handleClickToReg = () => router.push("/register");

  return (
    <div className={styles.main}>
      <div className={styles.divMainSub}>
        <div className={styles.divTitles}>
          <h1 className={styles.title}>The 404 Server Manager</h1>
          <h2>{userReducer.currentMachineDisplay.machineName}</h2>
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
