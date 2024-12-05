import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/StatusTableRow.module.css";

export default function StatusTableRow(props) {
  const user = useSelector((state) => state.user.value);
  const [appStatus, appStatusSetter] = useState(
    // props.elem.appName.includes("The404") ? props.elem.status == "online" ? "active" : "inactive"
    props.elem.status == "online" ? "active" : "inactive"
  );
  const [additionalRowsVisible, additionalRowsVisibleSetter] = useState(false);
  const toggleAdditionalRowsVisible = () => {
    console.log("--> toggling");
    additionalRowsVisibleSetter((prev) => !prev);
  };
  const toggleStatus = async (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
    console.log(
      'props.elem.name.includes("The404"): ',
      props.elem.name.includes("The404")
    );
    // if (appName == "The404ManagerBack") return;
    const bodyObj = {
      appName: props.elem.appName,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/status/toggle-app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
        body: JSON.stringify(bodyObj),
      }
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      console.log(responseJson);
      appStatusSetter(
        props.elem.name.includes("The404")
          ? responseJson.status == "restarted"
            ? "restarted"
            : "inactive"
          : responseJson.status == "started"
          ? "active"
          : "inactive"
      );
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  let listOfInnerElements = [];

  let counter = 0;
  for (let item of props.elem.innerListObjects) {
    console.log("item.nodeEnv");
    console.log(item.nodeEnv);
    listOfInnerElements.push(
      <div key={counter}>
        <div className={styles.divAddContentTitle}>
          Local IP Address (:port) of Machine:
        </div>
        <div className={styles.divAddContent}>
          {props.elem.localIpOfMachine}:{props.elem.port}
        </div>
        <div className={styles.divAddContentTitle}>Machine Name:</div>
        <div className={styles.divAddContent}>{item.machineName}</div>

        <div className={styles.divAddContentTitle}>filename:</div>
        <div className={styles.divAddContent}>{item.filename}</div>
        <div className={styles.divAddContentTitle}>urls:</div>
        {Array.from({ length: item.urls.length }, (_, index) => (
          <div className={styles.divAddContent}>
            {index + 1}
            {")"} {item.urls[index]}
          </div>
        ))}
        <div className={styles.divAddContentTitle}>
          Nginx File Last Modified:
        </div>
        <div className={styles.divAddContent}>{item.dateFileModified}</div>
        <div className={styles.divAddContentTitle}>
          Database Record Last Modified:
        </div>
        <div className={styles.divAddContent}>{item.dateRecordModified}</div>
      </div>
    );
    counter++;
  }

  return (
    <>
      <td className={styles.toggleCell} onClick={toggleAdditionalRowsVisible}>
        <div className={styles.tdDivNameOfApp}>{props.elem.nameOfApp}</div>
        <div
          className={`${styles.additionalContent} ${
            additionalRowsVisible ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.divAddContentTitle}>NODE_ENV:</div>
          <div className={styles.divAddContent}>{props.elem.nodeEnv}</div>
          {listOfInnerElements}
        </div>
      </td>
      <td className={styles.tdPort}>{props.elem.port}</td>
      <td className={styles.tdBtnStatus}>
        <button className={styles.btnStatus}>{props.elem.status}</button>
      </td>
    </>
  );
}
