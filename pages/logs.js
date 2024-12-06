// import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateView from "../components/TemplateView";
import styles from "../styles/Logs.module.css";

export default function Logs() {
  // const [logs, logsSetter] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [logs, logsSetter] = useState({
    pm2CombinedOutput: "",
    pm2CombinedError: "",
    syslog: "",
  });
  const [activeTab, setActiveTab] = useState("pm2CombinedOutput");

  useEffect(() => {
    (async () => {
      console.log("--- in useEffect Logs ---");
      console.log(`${user.currentMachineDisplay.urlFor404Api}/logs/combined`);
      const response = await fetch(
        `${user.currentMachineDisplay.urlFor404Api}/logs/combined`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Add token to Authorization header
          },
        }
      );

      if (response.status == 200) {
        const responseJson = await response.json();
        console.log("response: ");
        console.log(responseJson);
        logsSetter(responseJson.responseBody);
        // window.alert(`Successfully added: ${resJson.machineName}`);
      } else {
        window.alert(
          `There was a server error or you're not logged in: ${response.status}`
        );
      }

      // const pm2CombinedOutput = (
      //   <div>
      //     <h1>pm2CombinedOutput</h1>
      //     <div>{responseJson.responseBody.pm2CombinedOutput}</div>
      //   </div>
      // );
      // const dataPm2CombinedError = (
      //   <div>
      //     <h1>pm2CombinedError</h1>
      //     <div>{responseJson.responseBody.dataPm2CombinedError}</div>
      //   </div>
      // );
      // const syslog = (
      //   <div>
      //     <h1>syslog</h1>
      //     <div>{responseJson.responseBody.syslog}</div>
      //   </div>
      // );

      // const combinedLogs = (
      //   <div>
      //     <div>{pm2CombinedOutput}</div>
      //     <div>{dataPm2CombinedError}</div>
      //     <div>{syslog}</div>
      //   </div>
      // );
    })(); // end of async ()
  }, []);

  return (
    // <main className={styles.mainStatus}>
    //   <HeaderCustom />
    <TemplateView>
      <div style={{ position: "relative" }}>
        <div className={styles.tabsContainer}>
          {["pm2CombinedOutput", "pm2CombinedError", "syslog"].map((tab) => (
            <button
              key={tab}
              //   style={{
              //     ...styles.tab,
              //     ...(activeTab === tab ? styles.activeTab : {}),
              //   }}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.contentContainer}>
          <pre className={styles.logContent}>{logs[activeTab]}</pre>
        </div>
      </div>
    </TemplateView>
    // </main>
  );
}

// const styles = {
//   tabsContainer: {
//     display: "flex",
//     justifyContent: "space-around",
//     backgroundColor: "#f4f4f4",
//     padding: "10px",
//     borderBottom: "1px solid #ccc",
//     position: "fixed", // Makes the tabs stay at the top
//     top: "10rem",
//     left: 0,
//     right: 0,
//     zIndex: 1000, // Ensures the tabs appear above other content
//   },
//   tab: {
//     flex: 1,
//     padding: "10px",
//     cursor: "pointer",
//     textAlign: "center",
//     backgroundColor: "#e0e0e0",
//     border: "none",
//     borderRadius: "4px",
//     margin: "0 5px",
//     fontWeight: "bold",
//   },
//   activeTab: {
//     backgroundColor: "#0070f3",
//     color: "white",
//   },
//   contentContainer: {
//     padding: "20px",
//     backgroundColor: "black",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     marginTop: "13rem",
//   },
//   logContent: {
//     whiteSpace: "pre-wrap",
//     wordWrap: "break-word",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "white",
//   },
// };
