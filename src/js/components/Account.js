import { faEdit, faFile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faCartShopping,
  faClose,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mainColor } from "../config";
import { useGlobalFood } from "../FoodContext";

function Account() {
  const { account, dispatch } = useGlobalFood();

  return (
    <div
      className={`navAccount navAccount__black ${
        account.visibility ? "navAccount--visible" : ""
      }`}
    >
      <div
        className={`navAccount navAccount__red ${
          account.visibility ? "navAccount--visible" : ""
        }`}
      >
        <div
          className={`navAccount navAccount__white ${
            account.visibility ? "navAccount--visible" : ""
          }`}
        >
          <button
            className="navAccount__close"
            onClick={() => dispatch({ type: "account/visibilityToggle" })}
          >
            <FontAwesomeIcon
              icon={faClose}
              size="xs"
              style={{ color: mainColor }}
            />
          </button>

          <div>
            <img
              src={account.profileImg}
              alt="Avatar"
              className="navAccount__avatar"
            />

            <span>{account.username}</span>
          </div>

          <ul className="navAccount__list">
            <p>Account Informations</p>
            <li className="navAccount__item">
              <button
                className="nav__btn"
                onClick={() => dispatch({ type: "account/usernameInput" })}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Edit username</span>
              </button>
            </li>
            <li className="navAccount__item">
              <button
                className="nav__btn"
                onClick={() => dispatch({ type: "account/avatarChange" })}
              >
                <FontAwesomeIcon
                  icon={faImage}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Change avatar</span>
              </button>
            </li>
          </ul>

          <ul className="navAccount__list">
            <p>Actions</p>
            <li className="navAccount__item">
              <button
                className="nav__btn"
                onClick={() => dispatch({ type: "addRecipe/visibilityToggle" })}
              >
                <FontAwesomeIcon
                  icon={faFile}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Add recipe</span>
              </button>
            </li>

            <li className="navAccount__item">
              <button className="nav__btn">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Cart</span>
              </button>
            </li>
            <li className="navAccount__item">
              <a
                className="nav__btn"
                href="https://github.com/JosipCunko"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Visit my GitHub</span>
              </a>
            </li>
            <li className="navAccount__item">
              <a
                className="nav__btn"
                href="https://mail.google.com/mail/u/0/#inbox?compose=NZVHGCStzTMqVCbmvLCsrPQwFLCKFxgGwkskvBlwpDCQgcjXVZQmfFBgzQlgZMbXSNWsnB"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  size="xl"
                  style={{ color: mainColor }}
                />
                <span>Contact me</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
