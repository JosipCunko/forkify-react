import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faFile } from "@fortawesome/free-regular-svg-icons";
import { mainColor } from "../config.js";

function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="forkify-logo" className="header__logo" />
      <form className="search">
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
        />
        <button className="btn search__btn">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            style={{ color: "#fff" }}
          />
          <span>Search</span>
        </button>
      </form>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button className="nav__btn nav__btn--add-recipe">
              <FontAwesomeIcon
                icon={faFile}
                size="sm"
                style={{ color: mainColor }}
              />
              <span>Add recipe</span>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <FontAwesomeIcon
                icon={faBookmark}
                size="sm"
                style={{ color: mainColor }}
              />

              <span>Bookmakrs</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
