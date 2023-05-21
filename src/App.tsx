import "vite/modulepreload-polyfill";
import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Components/Header/Header";
import "./responsive.css";
import Main from "./Components/Main/Main";

function App() {
  const [theme, setTheme] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChangeTheme(): void {
    setTheme(!theme);
  }
  return (
    <div className={theme ? "dark-theme" : ""}>
      <Header
        onChangeTheme={handleChangeTheme}
        theme={theme}
        searchValue={searchValue}
        onChangeSearchValue={setSearchValue}
      />
      <Main searchValue={searchValue} />
    </div>
  );
}

export default App;
