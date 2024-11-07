//import the library
import { library } from "@fortawesome/fontawesome-svg-core";
//import your icon styles
import { faB } from "@fortawesome/free-solid-svg-icons";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { faR } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import RecipeInfo from "./components/RecipeInfo";
import SearchResults from "./components/SearchResults";
import AddRecipe from "./components/AddRecipe";
import { useGlobalFood } from "./FoodContext";
import Account from "./components/Account";

function App() {
  const { addRecipeWindow, account } = useGlobalFood();

  return (
    <>
      <Header />
      <SearchResults />
      <RecipeInfo />
      {addRecipeWindow.visibility && <AddRecipe />}
      {account.visibility && <Account />}
    </>
  );
}
export default App;
library.add(faB, faS, faR);
