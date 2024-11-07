import { faClose, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mainColor } from "../config";
import { useGlobalFood } from "../FoodContext";

function Account() {
  const { account, dispatch } = useGlobalFood();

  return (
    <div className="navAccount navAccount__black">
      <div className="navAccount navAccount__red">
        <div className="navAccount navAccount__white">
          <button
            className="navAccount__close"
            onClick={() => dispatch({ type: "account/visibilityToggle" })}
          >
            <FontAwesomeIcon
              icon={faClose}
              size="sm"
              style={{ color: mainColor }}
            />
          </button>

          <FontAwesomeIcon
            icon={faSmile}
            size="sm"
            style={{ color: mainColor }}
            className="navAccount__logo"
          />

          <ul className="navAccount__list">
            <li className="navAccount__item">
              <a className="navAccount__link" href="#">
                Teams
              </a>
            </li>
            <li className="navAccount__item">
              <a className="navAccount__link" href="#">
                Locations
              </a>
            </li>
            <li className="navAccount__item">
              <a className="navAccount__link" href="#">
                Life at Netflix
              </a>
            </li>
            <li className="navAccount__item">
              <ul className="navAccount__list">
                <li className="navAccount__item">
                  <a className="navAccount__link" href="#">
                    Netflix culture memo
                  </a>
                </li>
                <li className="navAccount__item">
                  <a className="navAccount__link" href="#">
                    Work life balance
                  </a>
                </li>
                <li className="navAccount__item">
                  <a className="navAccount__link" href="#">
                    Inclusion & diversity
                  </a>
                </li>
                <li className="navAccount__item">
                  <a className="navAccount__link" href="#">
                    Blog
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
