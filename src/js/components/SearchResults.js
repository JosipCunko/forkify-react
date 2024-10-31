import { useGlobalFood } from "../FoodContext.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { mainColor } from "../config.js";

function SearchResults() {
  const { searchResults } = useGlobalFood();
  const id = window.location.hash.slice(1);

  return (
    <div className="search-results">
      <ul className="results">
        {searchResults.map((searchResult) => (
          <li className="preview" key={crypto.randomUUID()}>
            <a
              className={`preview__link ${
                searchResult.id === id ? "preview__link--active" : ""
              }`}
              href={searchResult.id}
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
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
