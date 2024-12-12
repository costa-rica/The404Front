import styles from "../styles/Machines.module.css";
import TemplateView from "../components/TemplateView";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { setCurrentMachineDisplay } from "../reducers/user";

function Machines() {
  const [machineListRows, machineListRowsSetter] = useState([]);
  const [newMachineUrl, newMachineUrlSetter] = useState([]);
  const [isModalOpen, isModalOpenSetter] = useState(false); // State to control modal visibility
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    console.log("--- fetchMachines");
    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/machines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
      }
    );
    if (response.status == 200) {
      const resJson = await response.json();

      machineListRowsSetter(resJson.existingMachines);
      console.log("--- machineListRows ---");
      console.log(resJson.existingMachines);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  const handleAddMachine = async () => {
    console.log(" - add machine");
    console.log(newMachineUrl);
    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/machines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
        body: JSON.stringify({ urlFor404Api: newMachineUrl }),
      }
    );
    if (response.status == 200) {
      // sample machien: http://192.168.1.136:8001
      newMachineUrlSetter("");
      isModalOpenSetter(false);
      fetchMachines();
      const resJson = await response.json();
      window.alert(`Successfully added: ${resJson.machineName}`);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  const btnDisplay = (objMachineNameAndUrl) => {
    console.log("handleSttus button");
    dispatch(setCurrentMachineDisplay(objMachineNameAndUrl));
  };

  const btnReload = async () => {
    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/status/combined-update`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
      }
    );
    if (response.status == 200) {
      const resJson = await response.json();
      window.alert("Success! \nUpdated statuses of all apps on this machine");
      // machineListRowsSetter(resJson.existingMachines);
      // console.log("--- machineListRows ---");
      // console.log(resJson.existingMachines);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  return (
    <TemplateView>
      <div className={styles.machinePage}>
        <div className={styles.divModalAndTable}>
          <div className={styles.divAboveTable}>
            <div>
              <button
                className={styles.openModalButton}
                onClick={() => isModalOpenSetter(true)}
              >
                Add Machine
              </button>
            </div>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.modalTop}>
                  <FontAwesomeIcon
                    icon={faRectangleXmark}
                    onClick={() => isModalOpenSetter(false)}
                    className={styles.closeModalIcon}
                  />
                  <h2>Add new machine</h2>
                </div>
                <div>
                  <p>
                    Format for url:
                    <ul style={{ listStyleType: "none" }}>
                      <li>(1) "https://" will be added and</li>
                      <li>(2) any ending "/" will be removed</li>
                    </ul>
                  </p>
                  <input
                    className={styles.inputNewMachineUrl}
                    onChange={(e) => newMachineUrlSetter(e.target.value)}
                    value={newMachineUrl}
                    placeholder="new machine url"
                  />
                </div>
                <button
                  className={styles.btnAddMachine}
                  onClick={() => handleAddMachine()}
                >
                  Add Machine
                </button>
              </div>
            </div>
          )}
          <div className={styles.tableSuper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thAppName}>Machine name</th>
                  <th>Connected machine</th>
                </tr>
              </thead>
              <tbody>
                {machineListRows.map((elem, index) => (
                  <tr key={index} className={styles.trCustom}>
                    <td className={`${styles.tdMachineName} tdWrapAll`}>
                      {elem.machineName}
                      <div className={styles.tdMachineNameUrl}>
                        {elem.urlFor404Api}
                      </div>
                      <div className={styles.tdMachineNameBtnReload}>
                        <button onClick={() => btnReload()}>Reload</button>
                      </div>
                    </td>
                    <td className={styles.tdConnectedMachine}>
                      <button
                        className={styles.btnDisplay}
                        style={{
                          backgroundColor:
                            user.currentMachineDisplay?.machineName ===
                            elem.machineName
                              ? "green"
                              : "",
                        }}
                        onClick={() =>
                          btnDisplay({
                            machineName: elem.machineName,
                            urlFor404Api: elem.urlFor404Api,
                            userHomeDir: elem.userHomeDir,
                            nginxDir: elem.nginxDir,
                          })
                        }
                      >
                        {user.currentMachineDisplay?.machineName ===
                        elem.machineName
                          ? "Displaying"
                          : "off"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TemplateView>
  );
}

export default Machines;
