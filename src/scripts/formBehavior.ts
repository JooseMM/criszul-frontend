import type { InputNames } from "../models/InputNames";

const formName = document.getElementById("formName") as HTMLInputElement;
const formEmail = document.getElementById("formEmail") as HTMLInputElement;
const formMessage = document.getElementById("formMessage") as HTMLInputElement;
const formInputElements = [formName, formEmail, formMessage];

const form = document.querySelector("form") as HTMLFormElement;

const submitButton = document.getElementById(
  "submitButton",
) as HTMLButtonElement;

const errorList = new Map<InputNames, string>();

export const addOrUpdateErrorElement = (
  target: HTMLInputElement,
  errorList: Map<InputNames, string>,
) => {
  const error = errorList.has(target.name as InputNames);
  if (!error) {
    return; // if error is not found do nothing
  } else {
    // create a new span element
    const errorElement = document.createElement("span");
    // set its message
    errorElement.innerHTML = errorList.get(target.name as InputNames)!;
    // add the input invalid border
    target.classList.add("contact__input--invalid");
    // append the element as a child
    target.parentElement?.appendChild(errorElement);
  }
};

const onBlur = (event: Event): void => {
  const target = event.currentTarget as HTMLInputElement;

  updateErrorState(target, errorList);
  addOrUpdateErrorElement(target, errorList);
};

// check validation state and return an error message or null
export const updateErrorState = (
  target: HTMLInputElement,
  errorList: Map<InputNames, string>,
): void => {
  const state = target.validity;
  const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü0-9¡!.,\s¿?]+$/; // for textarea only
  let error = "";

  if (state.tooShort) {
    error = "Nombre invalido, minimo dos caracteres";
  }
  if (target.name === "message" && !regex.test(target.value)) {
    error = "Solo numeros, signos de puntuacion y exclamacion";
  }
  if (state.patternMismatch) {
    error = "Solo se permiten letras y espacios";
  }
  if (state.typeMismatch) {
    error = "Email invalido";
  }
  if (state.valueMissing) {
    error = "Campo requerido";
  }

  if (!error) {
    // remove it if no error is found
    errorList.delete(target.name as InputNames);
    submitButton.disabled = errorList.size ? true : false;
    return;
  }
  // if there is a new error push the new error
  errorList.set(target.name as InputNames, error);
  submitButton.disabled = true;
};

const onFocus = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const parentTarget = target.parentElement!;
  const previousError = parentTarget.querySelector("span");

  if (!previousError) {
    return;
  }
  target.classList.remove("contact__input--invalid");
  parentTarget.removeChild(previousError);
};

// add the logic to each input
formInputElements.forEach((input) => {
  input!.onblur = onBlur;
  input!.onfocus = onFocus;
});

const onSendingMessage = () => {
  const loadingImage = document.createElement("img");
  loadingImage.src = "icons/loading.png";
  submitButton.replaceChildren(loadingImage);
};

const onMessageDeliver = () => {
  submitButton.innerHTML = "Mensaje Enviado!";
  submitButton.disabled = true;
};

const onFailure = () => {
  submitButton.innerHTML = "Error, intentelo mas tarde";
  submitButton.disabled = true;
};

form.onsubmit = (event: Event) => {
  event.preventDefault();

  formInputElements.forEach((input) => {
    updateErrorState(input as HTMLInputElement, errorList);
    addOrUpdateErrorElement(input as HTMLInputElement, errorList);
  });

  if (errorList.size) {
    return;
  }

  const requestBody = {
    name: formName.value.trim(),
    email: formEmail.value.trim(),
    message: formMessage.value.trim(),
  };

  onSendingMessage();

  fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.successful) {
        onMessageDeliver();
      } else {
        onFailure();
      }
    })
    .catch(() => onFailure());
};
