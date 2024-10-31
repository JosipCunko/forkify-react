import { createContext, useContext, useReducer } from "react";

const FoodContext = createContext();

const initialState = {
  searchQuery: "",
  searchResults: [],
  recipeInfo: {
    id: "664c8f193e7aa067e94e894b",
    title: "Kiwi Sorbet",
    publisher: "Epicurious",
    sourceUrl:
      "http://www.epicurious.com/recipes/food/views/Kiwi-Sorbet-354134",
    image: "http://forkify-api.herokuapp.com/images/3541342a79.jpg",
    servings: 4,
    cookingTime: 15,
    ingredients: [
      {
        quantity: 2,
        unit: "pounds",
        description: "tender ripe green kiwifruit",
      },
      {
        quantity: 0.75,
        unit: "cup",
        description: "superfine granulated sugar",
      },
      {
        quantity: null,
        unit: "",
        description: "Equipment: an ice cream maker",
      },
    ],
    bookmarked: false,
  },
  bookmarks: [],
  myRecipes: [],
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

    default:
      throw new Error("Error");
  }
}

function FoodProvider({ children }) {
  const [
    { searchQuery, searchResults, recipeInfo, myRecipes, bookmarks },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <FoodContext.Provider
      value={{
        searchQuery,
        searchResults,
        recipeInfo,
        myRecipes,
        bookmarks,
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
