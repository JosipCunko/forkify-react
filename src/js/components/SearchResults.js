import { useGlobalFood } from "../FoodContext.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { mainColor, RES_PER_PAGE } from "../config.js";
import Loader from "./Loader.js";
import Notification from "./Notification.js";
import Pagination from "./Pagination.js";

function SearchResults() {
  const {
    searchQuery,
    searchResults,
    page,
    selectedRecipeId,
    dispatch,
    isLoading,
  } = useGlobalFood();

  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  const searchResultsToPages = searchResults.slice(start, end);

  if (isLoading.loadingResults) return <Loader />;

  return (
    <div className="search-results">
      <ul className="results">
        {!searchResultsToPages.length > 0 ? (
          searchQuery === "" ? null : (
            <Notification
              type={"error"}
              text={`No results found for '${searchQuery}'. Search terms are limited. Try another meal.`}
            />
          )
        ) : (
          searchResultsToPages.slice().map((searchResult) => (
            <li className="preview" key={crypto.randomUUID()}>
              <div
                className={`preview__link ${
                  searchResult.id === selectedRecipeId
                    ? "preview__link--active"
                    : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: "recipeInfo/select",
                    payload: searchResult.id,
                  })
                }
                // href={`#${searchResult.id}`}
              >
                <figure className="preview__fig">
                  <img src={searchResult.image_url} alt={searchResult.title} />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{searchResult.title}</h4>
                  <p className="preview__publisher">{searchResult.publisher}</p>
                  <div
                    className={`preview__user-generated ${
                      searchResult.key ? "" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size="lg"
                      className="recipe__info-icon"
                      style={{ color: mainColor }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <Pagination />
    </div>
  );
}

export default SearchResults;
