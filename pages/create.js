import styles from "../styles/Create.module.css";
import TemplateView from "../components/TemplateView";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

function Create() {
  const user = useSelector((state) => state.user.value);
  const [selectedRadioNginx, selectedRadioNginxSetter] = useState("");
  const [selectedRadioFramework, selectedRadioFrameworkSetter] = useState("");
  const [serverNames, serverNamesSetter] = useState([""]);
  const [cwd, cwdSetter] = useState("");
  const [localIp, localIpSetter] = useState("");
  const [port, portSetter] = useState("");

  const handleServerNameChange = (index, value) => {
    const updatedServerNames = [...serverNames];
    updatedServerNames[index] = value;
    serverNamesSetter(updatedServerNames);
  };

  const btnAddServerNameInput = () => {
    serverNamesSetter([...serverNames, ""]);
  };
  const btnRemoveServerNameInput = (index) => {
    const updatedServerNames = serverNames.filter((_, i) => i !== index);
    serverNamesSetter(updatedServerNames);
  };

  // Determine if the div should be visible
  const showCwd =
    selectedRadioNginx === "Confd" &&
    (selectedRadioFramework === "NextJs" ||
      selectedRadioFramework === "PythonFlask");

  const btnCreateFile = async () => {
    let serverNamesStringCommaSeparated = serverNames.join(",");

    console.log(`sending to :::`);
    console.log(
      `${user.currentMachineDisplay.urlFor404Api}/create/server-file`
    );
    console.log(`selectedRadioNginx: ${selectedRadioNginx}`);
    console.log(`selectedRadioFramework: ${selectedRadioFramework}`);
    console.log(
      `serverNamesStringCommaSeparated: ${serverNamesStringCommaSeparated}`
    );
    console.log(`cwd: ${cwd}`);

    let reqBodyObj = {
      framework: selectedRadioFramework,
      nginxDir: selectedRadioNginx,
      serverNames: serverNamesStringCommaSeparated,
      port: port,
    };
    if (cwd) {
      reqBodyObj = { ...reqBodyObj, appCwd: cwd };
    }
    if (localIp) {
      reqBodyObj = { ...reqBodyObj, localIp: localIp };
    }
    console.log(
      `---> what are serverNaems: ${serverNamesStringCommaSeparated}`
    );

    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/create/server-file`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
        body: JSON.stringify(reqBodyObj),
      }
    );
    if (response.status == 200) {
      const resJson = await response.json();

      selectedRadioNginxSetter("");
      selectedRadioFrameworkSetter("");
      serverNamesSetter([""]);
      cwdSetter("");
      localIpSetter("");
      portSetter("");
      window.alert(`Succsess! ${resJson.message}`);
    } else if (response.status == 401) {
      const resJson = await response.json();
      window.alert(`Error 401 because: ${resJson.error}`);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  return (
    <TemplateView>
      <div className={styles.divMainPageSuper}>
        <div className={styles.divMainPage}>
          <div className={styles.divInputGroupRadio}>
            <span className={`${styles.spanLabel}`}>Nginx dir: </span>
            <span className={styles.spanRadio}>
              <form className={styles.form}>
                {/* <label className={styles.labelRadio}> */}
                <label
                  className={
                    selectedRadioNginx === "Confd"
                      ? styles.labelRadioSelected
                      : styles.labelRadio
                  }
                >
                  <input
                    name="nginxDir"
                    type="radio"
                    value="Confd"
                    checked={selectedRadioNginx === "Confd"}
                    // onChange={handleRadioNginx}
                    onChange={(e) => selectedRadioNginxSetter(e.target.value)}
                  />
                  conf.d
                </label>
                <label
                  className={
                    selectedRadioNginx === "SitesAvailable"
                      ? styles.labelRadioSelected
                      : styles.labelRadio
                  }
                >
                  <input
                    name="nginxDir"
                    type="radio"
                    value="SitesAvailable"
                    checked={selectedRadioNginx === "SitesAvailable"}
                    onChange={(e) => selectedRadioNginxSetter(e.target.value)}
                  />
                  sites-available
                </label>
              </form>
            </span>
          </div>
          {/* ---- Nginx Dir Radio Group ----- */}
          <div className={styles.divInputGroupRadio}>
            <span className={styles.spanLabel}>Framework: </span>
            <span className={styles.spanRadio}>
              <form className={styles.form}>
                <label
                  className={
                    selectedRadioFramework === "expressJs"
                      ? styles.labelRadioSelected
                      : styles.labelRadio
                  }
                >
                  <input
                    name="framework"
                    type="radio"
                    value="expressJs"
                    checked={selectedRadioFramework === "expressJs"}
                    onChange={(e) =>
                      selectedRadioFrameworkSetter(e.target.value)
                    }
                  />
                  ExpressJS
                </label>
                <label
                  className={
                    selectedRadioFramework === "NextJs"
                      ? styles.labelRadioSelected
                      : styles.labelRadio
                  }
                >
                  <input
                    name="framework"
                    type="radio"
                    value="NextJs"
                    checked={selectedRadioFramework === "NextJs"}
                    onChange={(e) =>
                      selectedRadioFrameworkSetter(e.target.value)
                    }
                  />
                  Next.JS
                </label>
                <label
                  className={
                    selectedRadioFramework === "PythonFlask"
                      ? styles.labelRadioSelected
                      : styles.labelRadio
                  }
                >
                  <input
                    name="framework"
                    type="radio"
                    value="PythonFlask"
                    checked={selectedRadioFramework === "PythonFlask"}
                    onChange={(e) =>
                      selectedRadioFrameworkSetter(e.target.value)
                    }
                  />
                  Python Flask
                </label>
              </form>
            </span>
          </div>
          {/* ---- Framework Radio Group ----- */}

          <div className={styles.divInputGroupText}>
            <span className={`${styles.spanLabel} ${styles.spanLabelServer}`}>
              <div>server names: </div>
            </span>
            <span className={styles.spanInput}>
              <div className={styles.divInputServerNames}>
                {serverNames.map((name, index) => (
                  <div key={index} className={styles.divInputServerNames}>
                    <input
                      className={styles.inputServerName}
                      onChange={(e) =>
                        handleServerNameChange(index, e.target.value)
                      }
                      value={name}
                      placeholder="server name"
                    />

                    {index > 0 && (
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        onClick={() => btnRemoveServerNameInput(index)}
                        className={styles.iconMinus}
                      />
                    )}
                    {(name.includes(" ") || name.includes(",")) && (
                      <p className={styles.errorText}>
                        Server names cannot contain spaces or commas.
                      </p>
                    )}
                  </div>
                ))}

                <div className={styles.divIconPlus}>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={btnAddServerNameInput}
                    className={styles.iconPlus}
                  />
                </div>
              </div>
            </span>
          </div>
          {/* ---- DIV - Server Name ----- */}
          {showCwd && (
            <div className={styles.divInputGroupText}>
              <span className={`${styles.spanLabel} ${styles.spanLabelText}`}>
                CWD:{" "}
              </span>
              <span className={styles.spanInput}>
                <div className={styles.divInputText}>
                  <input
                    className={styles.inputServerName}
                    onChange={
                      (e) => cwdSetter(e.target.value)
                      // handleServerNameChange(index, e.target.value)
                    }
                    value={cwd}
                    placeholder="/home/user/application/appName"
                  />
                </div>
              </span>
            </div>
          )}
          {/* ---- small DIV - Current Working Dir  ----- */}
          {selectedRadioNginx === "SitesAvailable" && (
            <div className={styles.divInputGroupText}>
              <span className={`${styles.spanLabel} ${styles.spanLabelText}`}>
                Local IP:{" "}
              </span>
              <span className={styles.spanInput}>
                <div className={styles.divInputText}>
                  <input
                    className={styles.inputServerName}
                    onChange={
                      (e) => localIpSetter(e.target.value)
                      // handleServerNameChange(index, e.target.value)
                    }
                    value={localIp}
                    placeholder="192.0.0.0"
                  />
                </div>
              </span>
            </div>
          )}
          {/* ---- small DIV - Local IP  ----- */}

          <div className={styles.divInputGroupText}>
            <span className={`${styles.spanLabel} ${styles.spanLabelText}`}>
              Port:{" "}
            </span>
            <span className={styles.spanInput}>
              <div className={styles.divInputText}>
                <input
                  className={styles.inputServerName}
                  onChange={(e) => portSetter(e.target.value)}
                  value={port}
                  placeholder="8000"
                />
              </div>
            </span>
          </div>

          {/* ---- small DIV - Port  ----- */}

          {/* ---- Conditional Div ----
          {showConditionalDiv && (
            <div
              className={styles.conditionalDiv}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "#23263A",
                color: "white",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              This is a conditional div that appears when `conf.d` and either
              `Next.JS` or `Python Flask` are selected!
            </div>
          )} */}

          <div className={styles.divBtnCreateFile}>
            <button
              className={styles.btnCreateFile}
              onClick={() => btnCreateFile()}
            >
              Create File
            </button>
          </div>
        </div>
      </div>
    </TemplateView>
  );
}

export default Create;
