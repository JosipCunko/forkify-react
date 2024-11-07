import {
  faSmile,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mainColor } from "../config";

function Notification({ text, style = undefined, type }) {
  if (type === "message") {
    return (
      <div className="message" style={{ style }}>
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
      <div className="error" style={style}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="sm"
          style={{ color: mainColor }}
        />
        <p>{text}</p>
      </div>
    );
  }
}

export default Notification;
