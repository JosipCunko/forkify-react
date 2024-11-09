import { useGlobalFood } from "../FoodContext";
import { mainColor, RES_PER_PAGE } from "../config";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination() {
  const { searchResults, page, dispatch } = useGlobalFood();
  const numPages = Math.ceil(searchResults.length / RES_PER_PAGE);

  // Page 1, and there are other pages
  if (page === 1 && numPages > 1)
    return (
      <div className="pagination">
        <button
          onClick={() => dispatch({ type: "page/click", payload: +1 })}
          className="btn--inline pagination__btn--next"
        >
          <span>Page {page + 1}</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="sm"
            style={{ color: mainColor }}
            className="search__icon"
          />
        </button>
      </div>
    );

  // Last page
  if (page === numPages && numPages > 1)
    return (
      <div className="pagination">
        <button
          onClick={() => dispatch({ type: "page/click", payload: -1 })}
          className="btn--inline pagination__btn--prev"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="sm"
            style={{ color: mainColor }}
            className="search__icon"
          />
          <span>Page {page - 1}</span>
        </button>
      </div>
    );

  // Other page
  if (page < numPages)
    return (
      <div className="pagination">
        <button
          onClick={() => dispatch({ type: "page/click", payload: -1 })}
          className="btn--inline pagination__btn--prev"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="sm"
            style={{ color: mainColor }}
            className="search__icon"
          />
          <span>Page {page - 1}</span>
        </button>
        <button
          onClick={() => dispatch({ type: "page/click", payload: +1 })}
          className="btn--inline pagination__btn--next"
        >
          <span>Page {page + 1}</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="sm"
            style={{ color: mainColor }}
            className="search__icon"
          />
        </button>
      </div>
    );

  // Page 1, and there are NO other pages
  return "";
}

export default Pagination;
