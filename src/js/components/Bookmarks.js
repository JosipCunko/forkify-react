import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalFood } from "../FoodContext";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { mainColor } from "../config";

function Bookmarks() {
  const { bookmarks, selectedRecipeId, dispatch } = useGlobalFood();

  return (
    <div className="bookmarks">
      <ul className="bookmarks__list">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <li className="preview" key={crypto.randomUUID()}>
              <div
                className={`preview__link ${
                  bookmark.id === selectedRecipeId
                    ? "preview__link--active"
                    : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: "recipeInfo/select",
                    payload: bookmark.id,
                  })
                }
              >
                <figure className="preview__fig">
                  <img src={bookmark.image_url} alt={bookmark.title} />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{bookmark.title}</h4>
                  <p className="preview__publisher">{bookmark.publisher}</p>
                  <div
                    className={`preview__user-generated ${
                      bookmark.key ? "" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size="lg"
                      className="recipe__info--icon"
                      style={{ color: mainColor }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="error">
            <div>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                size="sm"
                style={{ color: mainColor }}
              />
            </div>
            <p>No bookmarks yet, Find a nice recipe and bookmark it :)</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Bookmarks;
