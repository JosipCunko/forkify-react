import { faPlus, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalFood } from "../FoodContext";
import { useReducer } from "react";
import { mainColor } from "../config";

const initialStateAddRecipe = {
  title: "Title",
  url: "url",
  imgUrl: "imgUrl",
  prepTime: 15,
  servings: 4,
  ings: [""],
};

function reducerAddRecipe(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "url":
      return { ...state, url: action.payload };
    case "imgUrl":
      return { ...state, imgUrl: action.payload };
    case "prepTime":
      return { ...state, prepTime: action.payload };
    case "servings":
      return { ...state, servings: action.payload };

    case "ings/add":
      if (state.ings.length === 5) return state;
      else return { ...state, ings: [...state.ings, ""] };
    case "ings/remove":
      return {
        ...state,
        ings: state.ings.filter((_, i) => i + 1 !== action.payload),
      };
    case "ings/change":
      const updatedIngs = [...state.ings];
      updatedIngs[action.payload.index] = action.payload.value;

      return { ...state, ings: updatedIngs };

    default:
      return state;
  }
}

function AddRecipe() {
  const { dispatch } = useGlobalFood();
  const [{ title, url, imgUrl, prepTime, servings, ings }, dispatchAddRecipe] =
    useReducer(reducerAddRecipe, initialStateAddRecipe);

  function handleSubmit(e) {
    e.preventDefault();

    //THIS IS WHERE I LEFT ON
    const transformedIngs = ings.map((ing) => {
      return ing.split(",");
    });

    console.log({ title, url, imgUrl, prepTime, servings, ings });
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
            placeholder="Your foood"
          />
          <label>URL</label>
          <input
            value={url}
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
            value={imgUrl}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "imgUrl", payload: e.target.value })
            }
            name="image"
            type="text"
            placeholder="https://image-of-food"
          />
          <label>Prep time</label>
          <input
            value={prepTime}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "prepTime", payload: +e.target.value })
            }
            name="cookingTime"
            type="number"
            placeholder="15 (mins)"
          />
          <label>Servings</label>
          <input
            value={servings}
            required
            onChange={(e) =>
              dispatchAddRecipe({ type: "servings", payload: +e.target.value })
            }
            name="servings"
            type="number"
            placeholder="4 (people)"
          />
        </div>
        <div className="upload__column upload__column--2">
          <h3 className="upload__heading">Ingredients</h3>
          {ings.map((ing, i) => (
            <>
              <label htmlFor={`ing-${i + 1}`}>Ingredient {i + 1}</label>
              <input
                type="text"
                required
                value={ing}
                id={`ing-${i + 1}`}
                placeholder="Format: 'Quantity,Unit,Description'"
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
                  dispatchAddRecipe({ type: "ings/remove", payload: i + 1 });
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
          {ings.length >= 5 && (
            <p
              className="upload__heading"
              style={{
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Maximum 5 ingredients allowed
            </p>
          )}

          <button
            className="btn upload__column--btn"
            onClick={(e) => {
              e.preventDefault();
              dispatchAddRecipe({ type: "ings/add" });
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "fff" }} />
            <span>Add more ingredients</span>
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
