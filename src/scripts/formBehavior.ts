/* input reference */

const formName = document.getElementById("formName");
const formEmail = document.getElementById("formEmail");
const formMessage = document.getElementById("formMessage");

// create error element
const errorElement = document.createElement("span");
errorElement.id = "formErrorMessage";

const addOrChangeError = (
  target: HTMLInputElement,
  parent: ParentNode,
  message: string | null,
  previousError: Element | null,
) => {
  if (!message) {
    return;
  }
  /* if and error is not found append a new errorElement */
  if (!previousError) {
    console.log(message);
    parent.appendChild(errorElement);
  }
  console.log(message);
  target.innerText = message; // change the message;
};
//.contact__input--invalid
/* input validation */
formName!.onblur = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const targetParent = target.parentNode!;
  const previousError = targetParent.querySelector(errorElement.id);
  const errorMessage = checkValidationState(target.validity);

  // if there is no error remove the element
  if (!errorMessage && previousError) {
    return targetParent.removeChild(previousError);
  }
  addOrChangeError(target, targetParent, errorMessage, previousError);
};

const checkValidationState = (state: ValidityState): string | null => {
  if (state.tooShort) {
    return "El campo debe de contener mas 2 caracteres";
  }
  if (state.valueMissing) {
    return "El campo es requerido";
  }
  if (state.patternMismatch) {
    return "El campo no permite numeros o caracteres especiales";
  }
  if (state.typeMismatch) {
    return "El email es invalido";
  }
  return null;
};
