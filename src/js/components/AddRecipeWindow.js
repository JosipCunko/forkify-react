import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalFood } from "../FoodContext";

function AddRecipeWindow() {
  const { dispatch } = useGlobalFood();

  return (
    <div className="add-recipe-window">
      <button
        className="btn--close-modal"
        onClick={() => dispatch({ type: "addRecipe/visibilityToggle" })}
      >
        x
      </button>
      <form className="upload">
        <div className="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" placeholder="Your foood" />
          <label>URL</label>
          <input
            required
            name="sourceUrl"
            type="text"
            placeholder="https://author-page"
          />
          <label>Image URL</label>
          <input
            required
            name="image"
            type="text"
            placeholder="https://image-of-food"
          />
          <label>Prep time</label>
          <input
            required
            name="cookingTime"
            type="number"
            placeholder="15 (mins)"
          />
          <label>Servings</label>
          <input
            required
            name="servings"
            type="number"
            placeholder="4 (people)"
          />
        </div>
        <div className="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          {Array.from({ length: 6 }).map((_, i) => (
            <>
              <label>Ingredient {i + 1}</label>
              <input
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </>
          ))}
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

export default AddRecipeWindow;
