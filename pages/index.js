import styles from "../styles/Index.module.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
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
      };

      dispatch(setCurrentMachineDisplay(currentMachineDisplay));
      console.log(" finished fetchMachineName");
    } catch {
      console.error("Error fetching data:");
      dispatch(
        setCurrentMachineDisplay({
          machineName: "failed to get API response",
          urlFor404Api: null,
        })
      );
    }
    if (userReducer.token) {
      // Redirect if token exists
      router.push("/status");
    }
  };
  const handleClickToLogin = () => router.push("/login");
  const handleClickToReg = () => router.push("/register");
  const handleClickLoginAsGuest = async () => {
    console.log("from index page click browse as a guest ---> API URL");
    console.log(
      `${userReducer.currentMachineDisplay.urlFor404Api}/users/login`
    );
    console.log("- handleClickReg 👀");
    const bodyObj = {
      email: process.env.NEXT_PUBLIC_GUEST_EMAIL,
      password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
    };

    const response = await fetch(
      `${userReducer.currentMachineDisplay.urlFor404Api}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );
    console.log("received response");
    if (response.status == 200) {
      const resJson = await response.json();
      console.log(resJson);
      dispatch(loginUser(resJson));
      router.push("/status");
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
    console.log("🚨 after the fetch ");
  };

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
          {/* <div className={styles.divBtnRegister}>
            <button
              className={styles.btnRegister}
              onClick={() => handleClickToReg()}
            >
              Register
            </button>
          </div> */}
          <div className={styles.divBtnBrowseAsAGuest}>
            <button
              className={styles.btnBrowseAsAGuest}
              onClick={() => handleClickLoginAsGuest()}
            >
              Browse as a guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
