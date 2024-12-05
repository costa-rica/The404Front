import styles from "../styles/Machines.module.css";
import TemplateView from "../components/TemplateView";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

function Machines() {
  const [machineListRows, machineListRowsSetter] = useState([]);
  const [newMachineUrl, newMachineUrlSetter] = useState([]);
  const [isModalOpen, isModalOpenSetter] = useState(false); // State to control modal visibility
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    console.log("--- new fetch amchiehhns");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/machines`,
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
      const machineListTemp = resJson.existingMachines.map((elem, index) => {
        console.log(elem);
        return (
          <tr key={`tr${index}`}>
            <td>{elem.machineName}</td>
            <td>{elem.urlFor404Api}</td>
          </tr>
        );
      });
      machineListRowsSetter(machineListTemp);
      console.log(resJson.appList);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  const handleAddMachine = async () => {
    console.log(" - add machine");
    console.log(newMachineUrl);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/machines`,
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
                  <p>This is a modal. Add your content here.</p>
                  <input
                    className={styles.inputNewMachineUrl}
                    onChange={(e) => newMachineUrlSetter(e.target.value)}
                    value={newMachineUrl}
                    placeholder="new machine url"
                  />
                </div>
                <button
                  className={styles.closeModalButton}
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {machineListRows}

                {Array.from({ length: 100 }, (_, index) => (
                  <tr key={index}>
                    <td>Row {index + 1} Data 1</td>
                    <td>Row {index + 1} Data 2</td>
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
