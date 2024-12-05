import styles from "../styles/Home.module.css";
import NavigationBar from "./NavigationBar";
import TemplateView from "./TemplateView";

function Home() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <div>
        <h1>{i}This is important</h1>
        <div>
          <h2>This is less imporant</h2>
        </div>
      </div>
    );
  }

  return (
    <TemplateView>
      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {rows}
      </div>
    </TemplateView>
  );
}

export default Home;
