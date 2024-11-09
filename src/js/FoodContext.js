import { createContext, useContext, useEffect, useReducer } from "react";
import { API_URL } from "./config";

import { AJAX, getRandomNumber, setError } from "./helpers";

const FoodContext = createContext();

const initialState = {
  account: {
    visibility: false,
    username: "Josip",
    usernameInput: false,
    profileImg: "https://avatar.iran.liara.run/public/10",
  },
  searchQuery: "",
  searchResults: [],
  page: 1,
  recipeInfo: "",
  selectedRecipeId: "",
  addRecipeWindow: {
    visibility: false,
  },
  bookmarks: [],
  userRecipes: [],
  isLoading: {
    loadingRecipe: false,
    loadingResults: false,
  },
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "account/visibilityToggle":
      return {
        ...state,
        account: {
          ...state.account,
          usernameInput: false,
          visibility: !state.account.visibility,
        },
      };
    case "account/avatarChange":
      return {
        ...state,
        account: {
          ...state.account,
          profileImg: `https://avatar.iran.liara.run/public/${getRandomNumber(
            1,
            100
          )}`,
        },
      };
    case "account/usernameInput":
      return { ...state, account: { ...state.account, usernameInput: true } };
    case "account/usernameChange":
      return {
        ...state,
        account: {
          ...state.account,
          usernameInput: false,
          username: action.payload,
        },
      };

    case "search":
      return { ...state, searchQuery: action.payload };
    case "searchResults/set":
      return {
        ...state,
        searchResults: action.payload,
        isLoading: { ...state.isLoading, loadingResults: false },
        account: { ...state.account, usernameInput: false, visibility: false },
      };

    case "page/click":
      return { ...state, page: state.page + action.payload };

    case "recipeInfo/select":
      return { ...state, selectedRecipeId: action.payload };
    case "recipeInfo/set":
      return {
        ...state,
        recipeInfo: action.payload,
        isLoading: { ...initialState.isLoading },
        account: { ...state.account, usernameInput: false, visibility: false },
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

    case "addRecipe/add":
      return {
        ...state,
        userRecipes: [...state.userRecipes, action.payload.data.recipe],
        bookmarks: [...state.bookmarks, action.payload.data.recipe],
        isLoading: { ...initialState.isLoading },
        selectedRecipeId: action.payload.data.recipe.id,
      };
    case "addRecipe/visibilityToggle":
      return {
        ...state,
        addRecipeWindow: {
          ...state.addRecipeWindow,
          visibility: !state.addRecipeWindow.visibility,
        },
        account: { ...state.account, usernameInput: false, visibility: false },
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
    case "error/main":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...initialState.isLoading },
      };
    case "error/reset":
      return { ...state, error: null };

    default:
      throw new Error(
        "Invalid type/payload in dispatch function call, or smth. else"
      );
  }
}

function FoodProvider({ children }) {
  const [
    {
      account,
      searchQuery,
      searchResults,
      page,
      recipeInfo,
      selectedRecipeId,
      addRecipeWindow,
      userRecipes,
      bookmarks,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getFoodBySearch() {
        try {
          dispatch({ type: "loading/results" });
          const data = await AJAX(`${API_URL}?search=${searchQuery}`);

          return data.data.recipes;
        } catch (error) {
          setError(dispatch, error.message);
        }
      }
      if (searchQuery)
        getFoodBySearch().then((foodData) => {
          console.log(foodData);
          dispatch({
            type: "searchResults/set",
            payload: foodData,
          });
        });
    },
    [searchQuery]
  );

  useEffect(
    function () {
      async function getFoodById(id) {
        try {
          dispatch({ type: "loading/recipe" });
          const data = await AJAX(`${API_URL}/${id}`);
          return data;
        } catch (error) {
          setError(dispatch, error.message);
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
        account,
        searchQuery,
        searchResults,
        page,
        selectedRecipeId,
        recipeInfo,
        bookmarks,
        userRecipes,
        addRecipeWindow,
        isLoading,
        error,
        dispatch,
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
