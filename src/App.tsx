import "vite/modulepreload-polyfill";
import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Components/Header/Header";
import "./responsive.css";
import Main from "./Components/Main/Main";

function App() {
  const [theme, setTheme]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [searchValue, setSearchValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");

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
