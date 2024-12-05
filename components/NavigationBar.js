import styles from "../styles/NavigationBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  const user = useSelector((state) => state.user.value);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the menu container
  const router = useRouter();
  const currentPath = router.pathname;
  const toggleMenu = () => {
    // setMenuOpen((prev) => !prev);<--- toggles
    setMenuOpen(true);
  };
  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav-custom">
      <div className={styles.divHeaderTop}>
        <div className={styles.divHeaderTopLeft}>
          <h1 className={styles.h1AppName}>The 404 Server Manager</h1>
          <h2 className={styles.h2MachineName}>{user.machineName}</h2>
        </div>
        <div className={styles.divHeaderRight}>
          <button
            className={styles.hamburgerMenu}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: "xx-large", color: "white" }}
            />
          </button>
          <ul
            className={`${styles.divHeaderRightUl} ${
              menuOpen ? styles.menuOpen : ""
            }`}
            ref={menuRef}
          >
            <li className={styles.divHeaderRightLi}>
              <a
                className={
                  currentPath === "/status"
                    ? styles.btnNavActive
                    : styles.btnNav
                }
                href="/status"
              >
                Status
              </a>
            </li>
            <li className={styles.divHeaderRightLi}>
              <a
                className={
                  currentPath === "/logs" ? styles.btnNavActive : styles.btnNav
                }
                href="/logs"
              >
                Logs
              </a>
            </li>
            <li className={styles.divHeaderRightLi}>
              <a
                className={
                  currentPath === "/create"
                    ? styles.btnNavActive
                    : styles.btnNav
                }
                href="/create"
              >
                Create
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.divLine}></div>
    </nav>
  );
}
