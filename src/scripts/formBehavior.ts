const formInputElements = [
  document.getElementById("formName"),
  document.getElementById("formEmail"),
  document.getElementById("formMessage"),
];

const form = document.querySelector("form") as HTMLFormElement;
form.noValidate = true; // avoid the default validation

const submitButton = document.getElementById(
  "submitButton",
) as HTMLButtonElement;

type InputNames = "fullname" | "email" | "message";

const errorArray = new Map<InputNames, string>();

const addOrUpdateErrorElement = (target: HTMLInputElement) => {
  const error = errorArray.has(target.name as InputNames);

  if (!error) {
    return; // if error is not found do nothing
  } else {
    // create a new span element
    const errorElement = document.createElement("span");
    // set its message
    errorElement.innerHTML = errorArray.get(target.name as InputNames)!;
    // add the input invalid border
    target.classList.add("contact__input--invalid");
    // append the element as a child
    target.parentElement?.appendChild(errorElement);
  }
};

const onBlur = (event: Event): void => {
  const target = event.currentTarget as HTMLInputElement;

  updateErrorState(target);
  addOrUpdateErrorElement(target);
};

// check validation state and return an error message or null
const updateErrorState = (target: HTMLInputElement): void => {
  const state = target.validity;
  let error = "";

  if (state.tooShort) {
    error = "Nombre invalido, minimo dos caracteres";
  }
  if (state.valueMissing) {
    error = "Campo requerido";
  }
  if (state.patternMismatch) {
    error = "Campo no permite numeros o caracteres especiales";
  }
  if (state.typeMismatch) {
    error = "Email invalido";
  }

  if (!error) {
    // remove it if no error is found
    errorArray.delete(target.name as InputNames);
    submitButton.disabled = errorArray.size ? true : false;
    return;
  }
  // if there is a new error push the new error
  errorArray.set(target.name as InputNames, error);
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

form.onsubmit = (event: Event) => {
  event.preventDefault();

  formInputElements.forEach((input) => {
    updateErrorState(input as HTMLInputElement);
    addOrUpdateErrorElement(input as HTMLInputElement);
  });

  if (errorArray.size) {
    return;
  }

  fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
