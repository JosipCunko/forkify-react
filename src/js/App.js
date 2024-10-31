//import the library
import { library } from "@fortawesome/fontawesome-svg-core";
//import your icon styles
import { faB } from "@fortawesome/free-solid-svg-icons";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { faR } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import RecipeInfo from "./components/RecipeInfo";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <>
      <Header />
      <SearchResults />
      <RecipeInfo />
    </>
  );
}

export default App;
library.add(faB, faS, faR);
