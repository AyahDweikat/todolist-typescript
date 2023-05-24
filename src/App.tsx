import "vite/modulepreload-polyfill";
import { useState } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Components/Header/Header";
import "./responsive.css";
import Main from "./Components/Main/Main";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChangeTheme(): void {
    setIsDarkTheme(!isDarkTheme);
  }
  return (
    <div className={isDarkTheme ? "dark-theme" : ""}>
      <Header
        onChangeTheme={handleChangeTheme}
        isDarkTheme={isDarkTheme}
        searchValue={searchValue}
        onChangeSearchValue={setSearchValue}
      />
      <Main searchValue={searchValue} />
    </div>
  );
}

export default App;
