import styles from "../styles/Register.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
import { useRouter } from "next/router";
import InputPassword from "../components/InputPassword";

export default function Register() {
  const [email, emailSetter] = useState("");
  const [password, passwordSetter] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const sendPasswordBackToParent = (passwordFromInputPasswordElement) => {
    console.log(
      `- in sendPasswordBackToParent: ${passwordFromInputPasswordElement} ✅`
    );
    passwordSetter(passwordFromInputPasswordElement);
  };

  const handleClickReg = async () => {
    const bodyObj = { email, password };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );
    console.log("received response: ", response.status);
    if (response.status == 200) {
      const resJson = await response.json();
      console.log("Got a sucessful 200 response ✅️");
      console.log(resJson);
      dispatch(loginUser(resJson));
      router.push("/status");
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }

    console.log("🚨 after the fetch ");
  };

  return (
    <main className={styles.main}>
      <div className={styles.divMainSub}>
        <div className={styles.divTitles}>
          <h1 className={styles.title}>The 404 Server Manager</h1>
          <h2>{user.machineName}</h2>
        </div>

        <div className={styles.divInputsAndBtns}>
          <div className={styles.divSuperInput}>
            <input
              className={styles.inputEmail}
              onChange={(e) => emailSetter(e.target.value)}
              value={email}
              placeholder="email"
            />
          </div>

          <InputPassword sendPasswordBackToParent={sendPasswordBackToParent} />
          <div className={styles.divBtnRegister}>
            <button
              className={styles.btnRegister}
              onClick={() => handleClickReg()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
