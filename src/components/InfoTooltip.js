import CorrectImage from "../images/Correct.svg";
import ErrorImage from "../images/Error.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="popup__container"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={props.registrationSuccessful ? CorrectImage : ErrorImage}
          className="infotooltip__image"
          alt="Значок ошибки"
        />
        <h2 className="infotooltip__text">
          {props.registrationSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так!\n" + "Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть попап"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
