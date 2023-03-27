import { useEffect } from "react";

function PopupWithForm(props) {
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
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div
        className="popup__container"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть попап"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          method="get"
          name={props.nameOfForm}
          className="form"
          noValidate
          id={props.idOfForm}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__save-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
