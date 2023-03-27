import { useEffect } from "react";

function ImagePopup(props) {
  //закрытие по клавише Esc
  function handleEscEscape(event) {
    if (event.key === "Escape") {
      props.onClose();
    }
  }
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", handleEscEscape);
      return () => {
        document.removeEventListener("keydown", handleEscEscape);
      };
    }
  }, [props.isOpen]);

  return (
    <div
      className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="popup__container popup__container_type_image"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть попап"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={props.card.link}
            className="popup__image"
            alt={props.card.name}
          />
          <figcaption className="popup__subline">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
