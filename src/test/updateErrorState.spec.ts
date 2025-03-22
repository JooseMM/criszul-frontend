import { expect } from "chai";

type InputNames = "fullname" | "email" | "message";

mocha.setup("bdd");

describe("HTML Input Validation", function () {
  let submitButton: HTMLButtonElement;
  let updateErrorState: (
    target: HTMLInputElement,
    errorList: Map<InputNames, string>,
  ) => void;
  let errorList: Map<InputNames, string>;

  beforeEach(() => {
    submitButton = document.getElementById(
      "submitButton",
    )! as HTMLButtonElement;

    updateErrorState = (
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
    errorList = new Map<InputNames, string>();
  });

  describe("Fullname", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formName") as HTMLInputElement;
    });

    it("it should add an error to the list", () => {
      input.value = "Ana <script>alert('Im a hacker! hehe')</scrip>";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should not add an error to the list", () => {
      input.value = "José Moreno";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });
  describe("Email", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formEmail") as HTMLInputElement;
    });

    it("it should add an error to the list, not a email ", () => {
      input.value = "notunemail";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });
    it("it should add an error to the list, empty string", () => {
      input.value = "";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });
    it("it should not add an error to the list", () => {
      input.value = "jamm.webdev@gmail.com";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });

  describe("Message", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formMessage") as HTMLInputElement;
    });

    it("it should add an error to the list, script", () => {
      input.value = "Hola! <scrip>alert('Hello, there!')</scrip>";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should add an error to the list, empty string", () => {
      input.value = "";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should not add an error to the list", () => {
      input.value = "Hola! Quiero empezar a realizar envios con ustedes.";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });
});

mocha.run();
