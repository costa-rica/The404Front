import styles from "../styles/Nginx.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateView from "../components/TemplateView";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

export default function Nginx() {
  const user = useSelector((state) => state.user.value);
  const [nginxLocation, nginxLocationSetter] = useState({
    confd: [{}],
    sitesAvailable: [{}],
  });
  const [activeTab, setActiveTab] = useState("confd");
  const [isModalOpen, isModalOpenSetter] = useState(false); // State to control modal visibility
  const [deleteFilename, deleteFilenameSetter] = useState("");
  const [deleteFilenameUrls, deleteFilenameUrlsSetter] = useState("");
  const [deleteFilenamePort, deleteFilenamePortSetter] = useState("");

  useEffect(() => {
    fetchFiles();
    // (async () => {
    //   console.log("--- in useEffect Logs ---");
    //   console.log(`${user.currentMachineDisplay.urlFor404Api}/nginx/combined`);
    //   const response = await fetch(
    //     `${user.currentMachineDisplay.urlFor404Api}/nginx/combined`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user.token}`, // Add token to Authorization header
    //       },
    //     }
    //   );

    //   if (response.status == 200) {
    //     const responseJson = await response.json();
    //     console.log("response: ");
    //     console.log(responseJson);
    //     nginxLocationSetter(responseJson);

    //   } else {
    //     window.alert(
    //       `There was a server error or you're not logged in: ${response.status}`
    //     );
    //   }
    // })(); // end of async ()
  }, []);

  const fetchFiles = async () => {
    console.log("--- in useEffect Logs ---");
    console.log(`${user.currentMachineDisplay.urlFor404Api}/nginx/combined`);
    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/nginx/combined`,
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
      nginxLocationSetter(responseJson);
    } else {
      window.alert(
        `There was a server error or you're not logged in: ${response.status}`
      );
    }
  };

  const pressedYesDelete = async () => {
    console.log(" - add pressedYesDelete");

    const fetchUrl =
      activeTab === "sitesAvailable"
        ? `${user.currentMachineDisplay.urlFor404Api}/nginx/sites-available`
        : `${user.currentMachineDisplay.urlFor404Api}/nginx/confd`;
    console.log(`fetchUrl: ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Add token to Authorization header
      },
      body: JSON.stringify({ fileName: deleteFilename }),
    });
    if (response.status == 200) {
      // sample machien: http://192.168.1.136:8001
      fetchFiles();
      const resJson = await response.json();
      window.alert(`Successfully deleted : ${deleteFilename}`);
      deleteFilenameSetter("");
      deleteFilenameUrlsSetter("");
      deleteFilenamePortSetter("");
      isModalOpenSetter(false);
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  return (
    // <main className={styles.mainStatus}>
    //   <HeaderCustom />
    <TemplateView>
      <div style={{ position: "relative" }}>
        <div className={styles.tabsContainer}>
          {["confd", "sitesAvailable"].map((tab) => (
            <button
              key={tab}
              //   style={{
              //     ...styles.tab,
              //     ...(activeTab === tab ? styles.activeTab : {}),
              //   }}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.tableSuper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thAppName}>Filename</th>

                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {nginxLocation[activeTab].map((elem, index) => (
                  <tr>
                    <td className={styles.tdFilename}>
                      <div className={styles.divTdFilename}>
                        {elem.filename}
                      </div>

                      <div className={styles.divTdIpAndPort}>
                        {activeTab === "sitesAvailable"
                          ? `${elem.localIpOfApp}:`
                          : null}
                        {elem.port}
                      </div>
                      {activeTab === "sitesAvailable" ? (
                        <div className={styles.divTdIpAndPort}>
                          {elem.machineName}
                        </div>
                      ) : null}
                    </td>
                    <td className={styles.tdRemove}>
                      <div className={styles.divTdRemove}>
                        <FontAwesomeIcon
                          icon={faCircleMinus}
                          // onClick={() => isModalOpenSetter(false)}
                          onClick={() => {
                            console.log("pressed buttpon");
                            deleteFilenameSetter(elem.filename);
                            deleteFilenameUrlsSetter(elem.urls);
                            deleteFilenamePortSetter(elem.port);
                            isModalOpenSetter(true);
                          }}
                          className={styles.iconDelete}
                        />
                        {/* <Image
                          src="/images/remove.png"
                          width={20}
                          height={20}
                          alt="Picture of the author"
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <h2>Are you sure?</h2>
              <div className={styles.divModalFilename}>
                <div>{deleteFilename}</div>

                <div className={styles.divModalPort}>
                  port: {deleteFilenamePort}
                </div>

                <div>urls: {deleteFilenameUrls}</div>
              </div>
            </div>

            <button
              className={styles.btnYesDelete}
              onClick={() => pressedYesDelete()}
            >
              Yes, delete
            </button>
          </div>
        </div>
      )}
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
