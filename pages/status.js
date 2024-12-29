import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import StatusTableRow from "../components/StatusTableRow";
import { useDispatch, useSelector } from "react-redux";
import TemplateView from "../components/TemplateView";
import { logoutUser } from "../reducers/user";
import { useRouter } from "next/router";

export default function Status() {
  const [appListRows, appListRowsSetter] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchPm2List(); // end of async ()
  }, []);

  const fetchPm2List = async () => {
    console.log(" in fetchPm2List ---");
    console.log(
      `url::: ${user.currentMachineDisplay.urlFor404Api}/status/list/pm2`
    );
    const response = await fetch(
      `${user.currentMachineDisplay.urlFor404Api}/status/list/pm2`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
      }
    );
    console.log(" in fetchPm2Lis got response ---");
    if (response.status == 200) {
      const resJson = await response.json();
      // const appsListTemp = resJson.appsList.map((elem, index) => {
      const appsListTemp = resJson.appList.map((elem, index) => {
        console.log(elem);
        return (
          <tr key={`tr${index}`} className={styles.trCustom}>
            <StatusTableRow elem={elem} />
          </tr>
        );
      });
      appListRowsSetter(appsListTemp);
      console.log("-- resJson.appsList --");
      // console.log(resJson.appsList);
      console.log(resJson.appList);
    } else if (response.status == 304) {
      window.alert(" Got the 304 thing???");
    } else if (response.status === 403) {
      console.log("--- accessed the 403 error else-if");
      // try {
      const resJson = await response.json();
      if (resJson.message === "Invalid token") {
        dispatch(logoutUser());
        window.alert("Logged out :)");
        router.push("/login");
      }
      // } catch {
      //   window.alert(
      //     `There was a 403 server error but no json with message property`
      //   );
      // }
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  return (
    <TemplateView>
      <div className={styles.statusPage}>
        <div className={styles.tableSuper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thAppName}>App name</th>
                <th className={styles.thPort}>Port</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{appListRows}</tbody>
          </table>
        </div>
      </div>
    </TemplateView>
  );
}
