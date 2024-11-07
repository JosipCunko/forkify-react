import {
  faFaceSmile,
  faClock,
  faUser,
  faSquarePlus,
  faSquareMinus,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBookmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Fraction } from "fractional";
import { useGlobalFood } from "../FoodContext.js";

import { mainColor } from "../config.js";
import Loader from "./Loader.js";

function RecipeInfo() {
  const {
    searchResults,
    recipeInfo,
    dispatch,
    isLoading,
    bookmarks,
    selectedRecipeId,
  } = useGlobalFood();

  return (
    <div className="recipe">
      {searchResults.length === 0 && (
        <div className="message">
          <div>
            <FontAwesomeIcon icon={faFaceSmile} style={{ color: mainColor }} />
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      )}

      {isLoading.loadingRecipe && <Loader />}

      {recipeInfo.length !== 0 && (
        <>
          <figure className="recipe__fig">
            <img
              src={recipeInfo.image_url}
              alt={recipeInfo.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{recipeInfo.title}</span>
            </h1>
          </figure>
          <div className="recipe__details">
            <div className="recipe__info">
              <FontAwesomeIcon
                size="lg"
                icon={faClock}
                style={{ color: mainColor }}
                className="recipe__info-icon"
              />
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipeInfo.cooking_time}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="lg"
                className="recipe__info-icon"
                style={{ color: mainColor }}
              />

              <span className="recipe__info-data recipe__info-data--people">
                {recipeInfo.servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() =>
                    dispatch({ type: "recipeInfo/updateServings", payload: -1 })
                  }
                >
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    size="lg"
                    style={{ color: mainColor }}
                  />
                </button>
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() =>
                    dispatch({ type: "recipeInfo/updateServings", payload: +1 })
                  }
                >
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    size="lg"
                    style={{ color: mainColor }}
                  />
                </button>
              </div>
            </div>

            <div
              className={`recipe__user-generated ${
                recipeInfo.key ? "" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                style={{ color: mainColor }}
                className="recipe__info-icon"
              />
            </div>
            <button
              className="btn--round btn--bookmark"
              onClick={() => dispatch({ type: "recipeInfo/bookmarkChange" })}
            >
              <FontAwesomeIcon icon={faBookmark} style={{ color: "#FFF" }} />
              <div
                className={`bookmarkCrossed ${
                  bookmarks.some((bm) => bm.id === selectedRecipeId)
                    ? ""
                    : "bookmarkCrossed--active"
                }`}
              ></div>
            </button>
          </div>
          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipeInfo.ingredients.map((ing) => (
                <li className="recipe__ingredient" key={crypto.randomUUID()}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    style={{ color: mainColor }}
                    className="recipe__icon"
                  />
                  <div className="recipe__quantity">
                    {ing.quantity ? new Fraction(ing.quantity).toString() : ""}
                  </div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ing.unit}</span>
                    {ing.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher"> {recipeInfo.publisher}</span>
              . Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipeInfo.source_url}
              target="_blank"
              rel="noreferrer"
            >
              <span>Directions</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                size="sm"
                style={{ color: "#fff" }}
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeInfo;
