import { createContext, useContext, useEffect, useReducer } from "react";
import { API_KEY, API_URL } from "./config";

import { AJAX } from "./helpers";

const FoodContext = createContext();

const initialState = {
  searchQuery: "",
  searchResults: [],
  selectedRecipeId: "",
  recipeInfo: {},
  bookmarks: [],
  userRecipes: [],
  addRecipeWindow: {
    visibility: false,
    data: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, searchQuery: action.payload };
    case "recipeInfo/bookmarkChange":
      return {
        ...state,
        recipeInfo: {
          ...state.recipeInfo,
          bookmarked: !state.recipeInfo.bookmarked,
        },
      };
    case "recipeInfo/updateServings":
      const currentServings = state.recipeInfo.servings;
      const newServings = currentServings + action.payload;

      if (newServings < 2 || newServings > 20) return state;

      return {
        ...state,
        recipeInfo: {
          ...state.recipeInfo,
          ingredients: state.recipeInfo.ingredients.map((ing) => ({
            ...ing,
            quantity: ing.quantity
              ? Number(
                  ((ing.quantity * newServings) / currentServings).toFixed(2)
                )
              : null,
          })),
          servings: newServings,
        },
      };
    case "addRecipe/visibilityToggle":
      return {
        ...state,
        addRecipeWindow: {
          ...state.addRecipeWindow,
          visibility: !state.addRecipeWindow.visibility,
        },
      };
    case "searchResults/set":
      return { ...state, searchResults: action.payload };

    case "recipeInfo/select":
      return { ...state, selectedRecipeId: action.payload };
    case "recipeInfo/set":
      return { ...state, recipeInfo: action.payload };

    default:
      throw new Error("Invalid type or payload in dispatch function call");
  }
}

function FoodProvider({ children }) {
  const [
    {
      searchQuery,
      searchResults,
      recipeInfo,
      userRecipes,
      bookmarks,
      addRecipeWindow,
      selectedRecipeId,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getFoodBySearch() {
        try {
          const data = await AJAX(
            `${API_URL}?search=${searchQuery}&key=${API_KEY}`
          );

          return data.data.recipes;
        } catch (error) {
          console.error("Errrrror 💥💥💥 ");
        }
      }
      if (searchQuery)
        getFoodBySearch().then((foodData) =>
          dispatch({
            type: "searchResults/set",
            payload: foodData,
          })
        );
    },
    [searchQuery]
  );

  useEffect(
    function () {
      async function getFoodById(id) {
        try {
          const data = await AJAX(`${API_URL}${id}&key=${API_KEY}`);
          console.log(data);
          return data;
        } catch (error) {
          console.error("Errrrror 💥💥💥 ");
        }
      }

      if (selectedRecipeId.length > 0)
        getFoodById(selectedRecipeId).then((foodInfo) =>
          dispatch({ type: "recipeInfo/set", payload: foodInfo })
        );
    },
    [selectedRecipeId]
  );

  return (
    <FoodContext.Provider
      value={{
        searchQuery,
        searchResults,
        recipeInfo,
        userRecipes,
        bookmarks,
        dispatch,
        addRecipeWindow,
        selectedRecipeId,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

function useGlobalFood() {
  const context = useContext(FoodContext);
  if (context === undefined)
    throw new Error("FoodContext was used outside of FoodProvider");
  return context;
}

export { FoodProvider, useGlobalFood };
