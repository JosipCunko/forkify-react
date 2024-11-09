import {
  faSmile,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mainColor } from "../config";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";
import { useGlobalFood } from "../FoodContext";

function Notification({
  text,
  style = undefined,
  type,
  classNameAdditional = null,
}) {
  const { dispatch } = useGlobalFood();
  const usernameRef = useRef(null);

  if (type === "message") {
    return (
      <div
        className={
          classNameAdditional ? `message ${classNameAdditional}` : "message"
        }
        style={{ style }}
      >
        <div>
          <FontAwesomeIcon
            icon={faSmile}
            size="sm"
            style={{ color: mainColor }}
          />
        </div>
        <p>{text}</p>
      </div>
    );
  }
  if (type === "error") {
    return (
      <div
        className={
          classNameAdditional ? `error ${classNameAdditional}` : "error"
        }
        style={style}
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="sm"
          style={{ color: mainColor }}
        />
        <p>{text}</p>
      </div>
    );
  }

  if (type === "input") {
    return (
      <div
        className={
          classNameAdditional
            ? `input add-recipe-window ${classNameAdditional}`
            : "input add-recipe-window"
        }
        style={style}
      >
        <FontAwesomeIcon
          icon={faCircleQuestion}
          size="sm"
          style={{ color: mainColor }}
        />

        <form
          className="search"
          onSubmit={() =>
            dispatch({
              type: "account/usernameChange",
              payload: usernameRef.current,
            })
          }
        >
          <input
            className="search__field"
            placeholder={text}
            onChange={(e) => (usernameRef.current = e.target.value)}
          />
          <button className="btn search__btn">Confirm</button>
        </form>
      </div>
    );
  }
}

export default Notification;
