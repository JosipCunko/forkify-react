import { faPlus, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalFood } from "../FoodContext";
import { useEffect, useReducer } from "react";
import { API_KEY, API_URL, mainColor } from "../config";

import Notification from "./Notification";
import { AJAX, setError } from "../helpers";

const initialStateAddRecipe = {
  title: "",
  source_url: "",
  image_url: "",
  publisher: "",
  cooking_time: "",
  servings: "",
  ings: [""],
  error: {
    errorIngs: false,
    errorFormat: false,
  },
};

function reducerAddRecipe(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "url":
      return { ...state, source_url: action.payload };
    case "imgUrl":
      return { ...state, image_url: action.payload };
    case "publisher":
      return { ...state, publisher: action.payload };
    case "prepTime":
      return { ...state, cooking_time: action.payload };
    case "servings":
      return { ...state, servings: action.payload };

    case "ings/add":
      if (state.ings.length === 5) return state;
      else return { ...state, ings: [...state.ings, ""] };
    case "ings/remove":
      return {
        ...state,
        ings: state.ings.filter((_, i) => i + 1 !== action.payload),
        error: { ...initialStateAddRecipe.error },
      };
    case "ings/change":
      const updatedIngs = [...state.ings];
      updatedIngs[action.payload.index] = action.payload.value;

      return {
        ...state,
        ings: updatedIngs,
        error: { ...initialStateAddRecipe.error },
      };

    case "error/ings":
      return { ...state, error: { ...state.error, errorIngs: true } };
    case "error/format":
      return { ...state, error: { ...state.error, errorFormat: true } };
    case "error/reset":
      return { ...state, error: { ...initialStateAddRecipe.error } };

    default:
      return state;
  }
}

function AddRecipe() {
  const { dispatch } = useGlobalFood();

  const [
    {
      title,
      source_url,
      image_url,
      publisher,
      cooking_time,
      servings,
      ings,
      error,
    },
    dispatchAddRecipe,
  ] = useReducer(reducerAddRecipe, initialStateAddRecipe);

  useEffect(
    function () {
      if (ings.length > 0) {
        dispatchAddRecipe({ type: "error/reset" });
      }
      if (ings.length === 0) {
        dispatchAddRecipe({ type: "error/ings" });
      }
    },
    [ings.length]
  );

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (error.errorIngs) return;

      let wrongFormat = false;
      ings.forEach((ing) => {
        if (ing.split(",").length !== 3) {
          wrongFormat = true;
          dispatchAddRecipe({ type: "error/format" });
          return;
        }
      });

      if (wrongFormat) return;

      const transformedIngs = ings.map((ing) => {
        const [quantity, unit, description] = ing.split(",");

        return {
          quantity: quantity ? quantity.trim() : null,
          unit: unit.trim(),
          description: description.trim(),
        };
      });

      dispatch({ type: "addRecipe/visibilityToggle" });

      const myNewRecipe = {
        title,
        source_url,
        image_url,
        cooking_time,
        servings,
        publisher,
        ingredients: transformedIngs,
      };

      const data = await AJAX(`${API_URL}?key=${API_KEY}`, myNewRecipe);
      dispatch({ type: "addRecipe/add", payload: data });
      console.log("Uploaded data: ", data);
    } catch (error) {
      setError(dispatch, error.message);
    }
  }

  return (
    <div className="add-recipe-window">
      <button
        className="btn--close-modal"
        onClick={() => dispatch({ type: "addRecipe/visibilityToggle" })}
      >
        x
      </button>
      <form className="upload" onSubmit={handleSubmit}>
        <div className="upload__column">
          <h3 className="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input
            value={title}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "title", payload: e.target.value })
            }
            name="title"
            type="text"
            placeholder="Food name"
          />
          <label>URL</label>
          <input
            value={source_url}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "url", payload: e.target.value })
            }
            name="sourceUrl"
            type="text"
            placeholder="https://author-page"
          />
          <label>Image URL</label>
          <input
            value={image_url}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "imgUrl", payload: e.target.value })
            }
            name="image"
            type="text"
            placeholder="https://img"
          />
          <label>Publisher</label>
          <input
            value={publisher}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "publisher", payload: e.target.value })
            }
            name="publisher"
            type="text"
            placeholder="John Smith"
          />
          <label>Prep time</label>
          <input
            value={cooking_time}
            required
            onChange={(e) =>
              dispatchAddRecipe({
                type: "prepTime",
                payload: e.target.value,
              })
            }
            name="cookingTime"
            type="text"
            placeholder="15 [mins]"
          />
          <label>Servings</label>
          <input
            value={servings}
            required
            onChange={(e) =>
              dispatchAddRecipe({
                type: "servings",
                payload: e.target.value,
              })
            }
            name="servings"
            type="text"
            placeholder="4 [people]"
          />
        </div>
        <div className="upload__column upload__column--2">
          <h3 className="upload__heading">Ingredients</h3>
          {error.errorIngs && (
            <Notification
              type={"error"}
              text={"At least one ingredient is neccessary."}
              style={{ gridColumn: "1/ -1", padding: "0 4rem" }}
            />
          )}
          {error.errorFormat && (
            <Notification
              type={"error"}
              text={`Wrong ingredient format. Please use this format: quantity, unit, description`}
              style={{ gridColumn: "1/ -1", padding: "0 4rem" }}
            />
          )}

          {ings.map((ing, i) => (
            <>
              <label htmlFor={`ing-${i + 1}`}>Ingredient {i + 1}</label>
              <input
                type="text"
                required
                value={ing}
                id={`ing-${i + 1}`}
                placeholder="Format: 'quantity, unit, description'"
                onChange={(e) =>
                  dispatchAddRecipe({
                    type: "ings/change",
                    payload: { index: i, value: e.target.value },
                  })
                }
              />
              <button
                style={{ backgroundColor: mainColor }}
                className="upload__btn--remove"
                onClick={(e) => {
                  e.preventDefault();
                  dispatchAddRecipe({
                    type: "ings/remove",
                    payload: i + 1,
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  style={{ color: "fff" }}
                />
              </button>
            </>
          ))}

          <button
            className="btn upload__column--btn"
            onClick={(e) => {
              e.preventDefault();
              dispatchAddRecipe({ type: "ings/add" });
            }}
            disabled={ings.length === 5}
          >
            {ings.length === 5 ? (
              <span>Max. 5 ingredients allowed</span>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  style={{ color: "fff" }}
                />
                <span>Add more ingredients</span>
              </>
            )}
          </button>
        </div>

        <button className="btn upload__btn">
          <FontAwesomeIcon
            icon={faUpload}
            size="sm"
            style={{ color: "#fff" }}
          />
          <span>Upload</span>
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
