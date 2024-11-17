import SideBar from "./components/molecules/sideBar/Sidebar";
import BrandRegistry from "./components/organisms/BrandRegister/BrandRegistry";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <BrandRegistry />
    </div>
  );
}

export default App;
