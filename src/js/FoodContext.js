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
  isLoading: {
    loadingRecipe: false,
    loadingResults: false,
  },
  addRecipeWindow: {
    visibility: false,
  },
  bookmarks: [],
  account: {
    visibility: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, searchQuery: action.payload };

    case "account/visibilityToggle":
      return {
        ...state,
        account: { ...state.account, visibility: !state.account.visibility },
      };

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
      return {
        ...state,
        searchResults: action.payload,
        isLoading: { ...state.isLoading, loadingResults: false },
      };
    case "recipeInfo/select":
      return { ...state, selectedRecipeId: action.payload };
    case "recipeInfo/set":
      return {
        ...state,
        recipeInfo: action.payload,
        isLoading: { ...initialState.isLoading },
      };

    case "loading/recipe":
      return {
        ...state,
        isLoading: { ...state.isLoading, loadingRecipe: true },
      };
    case "loading/results":
      return {
        ...state,
        isLoading: { ...state.isLoading, loadingResults: true },
      };

    case "addRecipe/add":
      return {
        ...state,
        userRecipes: [...state.userRecipes, action.payload],
        bookmarks: [...state.bookmarks, action.payload],
        isLoading: { ...initialState.isLoading },
      };

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
      account,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getFoodBySearch() {
        try {
          dispatch({ type: "loading/results" });
          const data = await AJAX(
            `${API_URL}?search=${searchQuery}&key=${API_KEY}`
          );

          return data.data.recipes;
        } catch (error) {
          throw new Error(error);
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
          dispatch({ type: "loading/recipe" });
          const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
          return data;
        } catch (error) {
          throw new Error(error);
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
        account,
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
