import { createContext, useContext, useEffect, useReducer } from "react";
import { API_KEY, API_URL } from "./config";

import { AJAX } from "./helpers";

const FoodContext = createContext();

const initialState = {
  searchQuery: "",
  searchResults: [],
  recipeInfo: "",
  selectedRecipeId: "",
  userRecipes: [],
  isLoading: false,
  addRecipeWindow: {
    visibility: false,
    data: {},
  },
  bookmarks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, searchQuery: action.payload };
    case "recipeInfo/bookmarkChange":
      if (state.bookmarks.some((bm) => bm.id === state.selectedRecipeId))
        return {
          ...state,
          bookmarks: state.bookmarks.filter(
            (bm) => bm.id !== state.selectedRecipeId
          ),
        };
      else {
        return {
          ...state,
          bookmarks: [...state.bookmarks, state.recipeInfo],
        };
      }

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
    case "searchResults/set":
      return { ...state, searchResults: action.payload, isLoading: false };
    case "recipeInfo/select":
      return { ...state, selectedRecipeId: action.payload };
    case "recipeInfo/set":
      return { ...state, recipeInfo: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "addRecipe/visibilityToggle":
      return {
        ...state,
        addRecipeWindow: {
          ...state.addRecipeWindow,
          visibility: !state.addRecipeWindow.visibility,
        },
      };

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
      selectedRecipeId,
      isLoading,
      userRecipes,
      bookmarks,
      addRecipeWindow,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getFoodBySearch() {
        try {
          dispatch({ type: "loading" });
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
          dispatch({ type: "loading" });
          const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
          return data;
        } catch (error) {
          console.error("Errrrror 💥💥💥 ");
        }
      }

      if (selectedRecipeId.length > 0)
        getFoodById(selectedRecipeId).then((foodInfo) => {
          dispatch({ type: "recipeInfo/set", payload: foodInfo.data.recipe });
        });
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
        isLoading,
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
