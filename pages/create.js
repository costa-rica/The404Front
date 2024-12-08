import styles from "../styles/Create.module.css";
import TemplateView from "../components/TemplateView";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function Create() {
  const [selectedRadioNginx, selectedRadioNginxSetter] = useState("");
  const [selectedRadioFramework, selectedRadioFrameworkSetter] = useState("");
  const [serverNames, serverNamesSetter] = useState([""]);
  const [cwd, cwdSetter] = useState("");
  const [localIp, localIpSetter] = useState("");
  const [port, portSetter] = useState("");

  // const handleRadioNginx = (event) => {
  //   selectedRadioNginxSetter(event.target.value);
  // };
  // const handleRadioFramework = (event) => {
  //   selectedRadioFrameworkSetter(event.target.value);
  // };

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

  const btnCreateFile = () => {
    console.log(`selectedRadioNginx: ${selectedRadioNginx}`);
    console.log(`selectedRadioFramework: ${selectedRadioFramework}`);
    console.log(`serverNames: ${serverNames}`);
    console.log(`cwd: ${cwd}`);
  };

  return (
    <TemplateView>
      <div className={styles.divMainPageSuper}>
        <div className={styles.divMainPage}>
          <div className={styles.divInputGroupRadio}>
            <span className={`${styles.spanLabel}`}>Nginx dir: </span>
            <span className={styles.spanRadio}>
              <form className={styles.form}>
                <label className={styles.labelRadio}>
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
                <label className={styles.labelRadio}>
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
                <label className={styles.labelRadio}>
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
                <label className={styles.labelRadio}>
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
                <label className={styles.labelRadio}>
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
              server names:{" "}
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
          {/* ---- small DIV - Current Working Dir  ----- */}

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
          {/* ---- small DIV - Local IP  ----- */}
          <div className={styles.divInputGroupText}>
            <span className={`${styles.spanLabel} ${styles.spanLabelText}`}>
              Port:{" "}
            </span>
            <span className={styles.spanInput}>
              <div className={styles.divInputText}>
                <input
                  className={styles.inputServerName}
                  onChange={
                    (e) => portSetter(e.target.value)
                    // handleServerNameChange(index, e.target.value)
                  }
                  value={port}
                  placeholder="8000"
                />
              </div>
            </span>
          </div>
          {/* ---- small DIV - Port  ----- */}

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
